import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private url = 'http://localhost:8080/api/admin'

  constructor(private http: HttpClient) { }

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  getAllUsers(email?: string, active?: string): Observable<any[]> {
    let params = new HttpParams();

    if (email) {
      params = params.set('email', email);
    }

    if (active === 'true') {
      params = params.set('active', 'true');
    } else if (active === 'false') {
      params = params.set('active', 'false');
    }

    return this.http.get<any[]>(`${this.url}/users`, { params, headers: this.getAuthHeaders() });
  }

  activateUser(id: number): Observable<any> {
    return this.http.put(`${this.url}/activate/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }


  deactivateUser(id: number): Observable<any> {
    return this.http.put(`${this.url}/deactivate/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }


  getSummary(): Observable<any> {
    return this.http.get(`${this.url}/summary`, { headers: this.getAuthHeaders() });
  }


  makeAdmin(id: number): Observable<any> {
    return this.http.put(`${this.url}/make-admin/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  removeAdmin(id: number): Observable<any> {
    return this.http.put(`${this.url}/remove-admin/${id}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

}
