import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewTransactionsService } from '../../services/view-transactions.service';
import { AccountService } from '../../services/account.service';
import { TransactionResponse } from './transaction-response.model';
import {NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { EditTransactionModalComponent } from './edit-transaction-modal/edit-transaction-modal.component';


@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css'
})
export class ViewTransactionsComponent {

  transactions: TransactionResponse[] = [];
  accounts: any[] = [];
  visibleCategories: string[] = [];

  showDeleteModal = false;
  transactionIdToDelete: number | null = null;

  expenseCategories = ['🍔 Food', '🚌 Transport', '🎬 Entertainment', '🧴 Personal Care', '💡 Utilities', '📱 Mobile Bills',
    '💊 Healthcare', '💳 Subscriptions', '📚 Education', '👕 Clothing', '🛒 Groceries', '🧾 Others'];
  incomeCategories = ['💼 Salary', '🎁 Gift', '💸 Refund', '💰 Freelance', '📈 Business Income', '🏦 Interest', '🧾 Others'];

  categoryEmojiMap: { [key: string]: string } = {};

  defaultMonth = new Date().toISOString().slice(0, 7);
  filters = {
    type: '',
    bankId: '',
    category: '',
    search: '',
    month: ''
  };

  constructor(
    private txService: ViewTransactionsService,
    private accountService: AccountService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchTransactions();
    this.loadBanks();
    this.buildCategoryEmojiMap();
  }

  loadBanks(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Error loading banks', err)
    });
  }

  fetchTransactions(): void {
    const filterToSend = { ...this.filters };

    if (filterToSend.category) {
      filterToSend.category = this.getPureCategory(filterToSend.category);
    }

    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filterToSend).filter(([_, v]) => v !== '')
    );
    this.txService.getFilteredTransactions(nonEmptyFilters).subscribe({
      next: (data) => {
        this.transactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (err) => console.error(err)
    });
  }

  onTypeChange(): void {
    if (this.filters.type === 'income') {
      this.visibleCategories = this.incomeCategories;
    } else if (this.filters.type === 'expense') {
      this.visibleCategories = this.expenseCategories;
    } else {
      this.visibleCategories = [];
      this.filters.category = '';
    }
  }

  buildCategoryEmojiMap(): void {
    const allCategories = [...this.expenseCategories, ...this.incomeCategories];
    allCategories.forEach(cat => {
      const pure = this.getPureCategory(cat);
      this.categoryEmojiMap[pure.toLowerCase()] = cat;
    });
  }

  getPureCategory(cat: string): string {
    return cat.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
  }

  openEditModel(transaction: TransactionResponse) {
    const modalRef = this.modalService.open(EditTransactionModalComponent);
    modalRef.componentInstance.transaction = {...transaction};

    modalRef.result.then(
      () => this.fetchTransactions(),
      () => {}
    );
  }

  
  confirmDelete(id: number): void {
    this.transactionIdToDelete = id;
    this.showDeleteModal = true;
  }

  performDelete(): void {
    if (this.transactionIdToDelete !== null) {
      this.txService.deleteTransaction(this.transactionIdToDelete).subscribe(() => {
        this.transactions = this.transactions.filter(t => t.id !== this.transactionIdToDelete);
        this.showDeleteModal = false;
        this.transactionIdToDelete = null;

      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.transactionIdToDelete = null;
  }

  resetFilters(): void {
    this.filters = {
      type: '',
      bankId: '',
      category: '',
      search: '',
      month: ''
    };
    this.fetchTransactions();
  }
}
