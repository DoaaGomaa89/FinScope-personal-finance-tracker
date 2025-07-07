import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionResponse } from '../view-transactions/transaction-response.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-export-transactions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './export-transactions.component.html',
  styleUrl: './export-transactions.component.css'
})
export class ExportTransactionsComponent implements OnInit {
  type: string = 'all';
  isLoading: boolean = false;
  transactions: TransactionResponse[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("Export Component Initialized");
    this.fetchPreview();
  }

  fetchPreview() {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };

    let url = `http://localhost:8080/api/transaction/preview`;
    if (this.type && this.type !== 'all') {
      url += `?type=${this.type}`;
    }

    this.http.get<TransactionResponse[]>(url, { headers }).subscribe({
      next: (data) => {
        this.transactions = data;
        console.log("Preview data: ", data);
        console.log(headers)
      },
      error: () => alert('Failed to load transaction preview')
    });
  }

  exportCsv() {
    this.isLoading = true;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `http://localhost:8080/api/transaction/export?type=${this.type}`;

    this.http.get(url, { headers, responseType: 'blob' }).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Export failed:', err);
        alert('Failed to export transactions.');
        this.isLoading = false;
      }
    });
  }
}