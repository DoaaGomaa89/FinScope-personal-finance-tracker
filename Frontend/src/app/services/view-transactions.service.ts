import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../pages/view-transactions/transaction-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewTransactionsService {
  private baseUrl = `${environment.apiBaseUrl}/transaction`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFilteredTransactions(filters: any): Observable<TransactionResponse[]> {
    let params = new HttpParams();
    if (filters.type) params = params.set('type', filters.type);
    if (filters.bankId) params = params.set('bankId', filters.bankId);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.month) params = params.set('month', filters.month); // e.g., "2025-06"

    return this.http.get<TransactionResponse[]>(`${this.baseUrl}/filter`, {
      params,
      headers: this.getAuthHeaders()
    });
  }

  updateTransaction(id: number, updateTransaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updateTransaction, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });

  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(), responseType: 'text'
    });
  }
}
