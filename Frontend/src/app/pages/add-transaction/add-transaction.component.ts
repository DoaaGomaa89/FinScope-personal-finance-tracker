import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { TransactionsService } from '../../services/transactions.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from './add-transaction.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule],

  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit {

  transactionForm!: FormGroup;

  transactionType: 'INCOME' | 'EXPENSE' = 'EXPENSE';

  accounts: any[] = [];
  showAccountWarning: boolean = false;

  categories: string[] = [];
  message: string = '';
  isExpense: boolean = true;

  expenseCategories = ['🍔 Food', '🚌 Transport', '🎬 Entertainment', '🧴 Personal Care', '💡 Utilities', '📱 Mobile Bills',
    '💊 Healthcare', '💳 Subscriptions', '📚 Education', '👕 Clothing', '🛒 Groceries', '🧾 Others'];
  incomeCategories = ['💼 Salary', '🎁 Gift', '💸 Refund', '💰 Freelance', '📈 Business Income', '🏦 Interest', '🧾 Others'];

  emojiCategoryMap: { [key: string]: string } = {
    '🍔 Food': 'Food',
    '🚌 Transport': 'Transport',
    '🎬 Entertainment': 'Entertainment',
    '🧴 Personal Care': 'Personal Care',
    '💡 Utilities': 'Utilities',
    '📱 Mobile Bills': 'Mobile Bills',
    '💊 Healthcare': 'Healthcare',
    '💳 Subscriptions': 'Subscriptions',
    '📚 Education': 'Education',
    '👕 Clothing': 'Clothing',
    '🛒 Groceries': 'Groceries',
    '🧾 Others': 'Others',
    '💼 Salary': 'Salary',
    '🎁 Gift': 'Gift',
    '💸 Refund': 'Refund',
    '💰 Freelance': 'Freelance',
    '📈 Business Income': 'Business Income',
    '🏦 Interest': 'Interest'
  };


  constructor(
    private fb: FormBuilder,
    private transacionsService: TransactionsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.transactionForm = this.fb.group({
      type: ['EXPENSE', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required, this.noFutureDateValidator]],
      accountId: ['', Validators.required],
    });


    this.setType('EXPENSE');

    this.accountService.getAllAccounts().subscribe((res) => {
      this.accounts = res;
      this.showAccountWarning = this.accounts.length === 0;

      // if(this.showAccountWarning) { this.transactionForm.disable()};
    });
  }

  noFutureDateValidator(control: AbstractControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? { futureDate: true } : null;
  }


  setType(type: string): void {
    if (this.transactionForm) {
      this.transactionForm.get('type')?.setValue(type.toUpperCase());
      this.transactionType = type.toUpperCase() as 'INCOME' | 'EXPENSE';

      this.isExpense = type.toUpperCase() === 'EXPENSE';
      this.categories = this.isExpense ? this.expenseCategories : this.incomeCategories;
      this.transactionForm.get('category')?.setValue('');
    }
  }


  onSubmit() {


    if (this.transactionForm.invalid) {
      console.log('Form is invalid'); // Add this for debugging
      return;
    }

    // const transaction: Transaction = this.transactionForm.value;
    const formValue = this.transactionForm.value;

    const cleanedCategory = this.emojiCategoryMap[formValue.category] || formValue.category;

    const transaction: Transaction = {
      ...formValue,
      category: cleanedCategory
    };


    this.transacionsService.addTransaction(transaction).subscribe({
      next: (res: any) => {

        console.log("Backend data", res);

        if (res.budgetExceeded) {
          this.snackBar.open(res.message || '⚠️ Budget exceeded!', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-warning']
          });
        } else {
          this.snackBar.open(res.message || '✅ Transaction added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        }

        this.transactionForm.reset();
        this.transactionForm.patchValue({
          type: 'EXPENSE',
          category: '',
          description: '',
          amount: '',
          date: '',
          account: ''
        });

        this.transactionForm.markAsPristine();
        this.transactionForm.markAsUntouched();

        // setTimeout(() => {this.message = ''; },3000);
      },

      error: (err) => {
        console.log("Backend error", err);
        this.snackBar.open('❌ Something went wrong. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }



}
