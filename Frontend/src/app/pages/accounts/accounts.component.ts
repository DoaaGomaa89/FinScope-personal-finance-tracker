import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from './account.model';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})

export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  accountForm!: FormGroup;
  editAccountId: number | null = null;
  message: string = '';
  messageToggle: string = '';

  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      bankName: [''],
      accountName: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      balance: ['', [Validators.required, Validators.min(0)]]
    });
    this.getAllAccounts();
  }

  onSubmit(): void {
    if (this.accountForm.invalid) return;

    this.accountService.addAccount(this.accountForm.value).subscribe({
      next: (data) => {
        this.accounts.push(data);
        this.message = '✅ Account details added successfully!';
        this.clearMessageAfterDelay();
      },
      error: () => {
        this.message = '❌ Failed to set account details.';
        this.clearMessageAfterDelay();
      }

    });
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }


  toggleAccountStatus(account: Account): void {
  this.accountService.toggleStatus(account.id).subscribe({
    next: (updatedAccount: Account) => {
      console.log("updated Account from serve: ", updatedAccount);
      account.isActive = updatedAccount.isActive;
      this.messageToggle = account.isActive ? '✅ Account activated' : '⚠️ Account deactivated';
      this.clearMessageAfterDelay();
    },
    error: () => {
      this.messageToggle = '❌ Failed to toggle account status.';
      this.clearMessageAfterDelay();
    }
  });
}


  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
      this.messageToggle = '';
    }, 3000)
  }

}

