import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlySummaryDto } from '../pages/dashboard/monthlySummaryDto';
import { environment } from '../../environments/environment';

export interface CategorySummaryDto {
  category: string;
  totalAmount: number;
}

export interface TransactionResponse {
  id: number;
  amount:number;
  category: string;
  type : "INCOME" | "EXPENSE"
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = `${environment.apiBaseUrl}/transaction`;

  constructor(private http: HttpClient) { }

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  getBalance(): Observable<any>{
    return this.http.get<any>(`${this.api}/balance`, {headers: this.getAuthHeaders()});
  }

  
  getMonthlySummary(): Observable<MonthlySummaryDto[]> {
    return this.http.get<any[]>(`${this.api}/summary/monthly`, {
      headers: this.getAuthHeaders()
    });
  }

  getCategorySummary(): Observable<CategorySummaryDto[]> {
    return this.http.get<CategorySummaryDto[]>(`${this.api}/category-summary?type=Expense`, {
      headers:this.getAuthHeaders()
    });
  }

  getRecentTransacations():Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.api}/recent`, {
      headers: this.getAuthHeaders()
    });
  }

}