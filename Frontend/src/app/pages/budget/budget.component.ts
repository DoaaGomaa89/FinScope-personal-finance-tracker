import { Component, TemplateRef } from '@angular/core';
import { BudgetRequest, BudgetResponse, BudgetService } from '../../services/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'] // ✅ Corrected plural form
})
export class BudgetComponent {

  budgetForm!: FormGroup;
  message: string = '';
  budgets: BudgetResponse[] = [];
  editBudgetId: number | null = null;
  selectedBudgetId: number | null = null;

  expenseCategories = [
    { label: '🍔 Food', value: 'Food' },
    { label: '🚌 Transport', value: 'Transport' },
    { label: '🎬 Entertainment', value: 'Entertainment' },
    { label: '🧴 Personal Care', value: 'Personal Care' },
    { label: '💡 Utilities', value: 'Utilities' },
    { label: '📱 Mobile Bills', value: 'Mobile Bills' },
    { label: '💊 Healthcare', value: 'Healthcare' },
    { label: '💳 Subscriptions', value: 'Subscriptions' },
    { label: '📚 Education', value: 'Education' },
    { label: '👕 Clothing', value: 'Clothing' },
    { label: '🛒 Groceries', value: 'Groceries' },
    { label: '🧾 Others', value: 'Others' }
  ];

  constructor(private fb: FormBuilder, private service: BudgetService, private modalServic: NgbModal) { }

  ngOnInit(): void {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      month: ['', Validators.required],
      limitAmount: [0, [Validators.required, Validators.min(1)]]
    });

    this.getAllBudgets();
  }

  setBudget() {
    if (this.budgetForm.invalid) return;

    const request: BudgetRequest = {
      category: this.budgetForm.value.category,
      month: this.budgetForm.value.month,
      limitAmount: this.budgetForm.value.limitAmount
    };

    if (this.editBudgetId) {
      this.service.updateBudget(this.editBudgetId, request).subscribe({
        next: () => {
          this.message = '✅ Budget updated successfully!';
          this.resetForm();
          this.getAllBudgets();
          this.clearMessageAfterDelay();
        },
        error: () => {
          this.message = '❌ Failed to update budget.';
          this.clearMessageAfterDelay();
        }
      });
    } else {
      // ➕ Add new budget
      this.service.setBudget(request).subscribe({
        next: () => {
          this.message = '✅ Budget set successfully!';
          this.resetForm();
          this.getAllBudgets();
          this.clearMessageAfterDelay();
        },
        error: () => {
          this.message = '❌ Failed to set budget.';
          this.clearMessageAfterDelay();
        }
      });
    }
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
    }, 3000); 
  }

  getAllBudgets() {
    this.service.getAllBudget().subscribe({
      next: (res) => this.budgets = res,
      error: () => this.budgets = []
    });
  }

  getUsagePercent(budget: BudgetResponse): number {
    if (!budget.limitAmount || budget.limitAmount === 0) return 0;
    const percent = (budget.usedAmount / budget.limitAmount) * 100;
    return Math.round(percent);
  }



  // edit operation
  editBudget(budget: BudgetResponse) {
    this.budgetForm.patchValue({
      category: budget.category,
      month: budget.month,
      limitAmount: budget.limitAmount
    });
    this.editBudgetId = budget.id;
  }

  resetForm() {
    this.budgetForm.reset({ limitAmount: 0 });
    this.editBudgetId = null;
  }


  // Delete operation
  openDeleteModal(id: number, modal: TemplateRef<any>) {
    this.selectedBudgetId = id;
    this.modalServic.open(modal, { centered: true, backdrop: 'static', windowClass: 'custom-delete-modal' });

  }

  confirmDelete(modalRef: any) {
    console.log(this.selectedBudgetId);
    if (this.selectedBudgetId !== null) {
      this.service.deleteBudget(this.selectedBudgetId).subscribe({
        next: () => {
          this.budgets = this.budgets.filter(b => b.id !== this.selectedBudgetId);
          modalRef.close();
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });;
    }
  }
}
