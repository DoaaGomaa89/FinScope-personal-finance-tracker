import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../pages/add-transaction/add-transaction.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private b_url = `${environment.apiBaseUrl}/transaction`;

  constructor(private http: HttpClient) { }

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  
  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.b_url}/add`, transaction, {
      headers: this.getAuthHeaders(),
    });
  }

}
