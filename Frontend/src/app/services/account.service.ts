import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../pages/accounts/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account, {
      headers: this.getAuthHeaders()
    });
  }

  toggleStatus(id: number): Observable<Account> {
    return this.http.patch<Account>(`${this.baseUrl}/${id}`, {},{
      headers: this.getAuthHeaders()
    });
  }
}
