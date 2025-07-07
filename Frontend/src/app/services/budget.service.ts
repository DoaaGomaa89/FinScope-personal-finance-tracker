import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface BudgetRequest {
  category: string;
  month: string;
  limitAmount: number;
}

export interface BudgetResponse {
  id: number;
  userId: number;
  category: string;
  month: string;
  limitAmount: number;
  usedAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) {}

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  setBudget(request: BudgetRequest): Observable<BudgetResponse> {
    return this.http.post<BudgetResponse>(`${this.baseUrl}/set-budget`, request, {
      headers: this.getAuthHeaders()
    });
  }

  getAllBudget(): Observable<BudgetResponse[]> {
    return this.http.get<BudgetResponse[]>(`${this.baseUrl}/get-all-budgets`, {
      headers: this.getAuthHeaders()
    });
  }

  updateBudget(id: number, budget:any): Observable<BudgetResponse> {
    return this.http.put<BudgetResponse>(`${this.baseUrl}/Budget/${id}`,budget ,{headers: this.getAuthHeaders()});
  }

  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/budget/${id}`, {headers: this.getAuthHeaders(), responseType: 'text' });
  }
}
