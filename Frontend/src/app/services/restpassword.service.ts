import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestpasswordService {

  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  sendOtp(email: string) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/request-otp`, { email }, { headers: this.getAuthHeaders() });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/verify-otp`, { email, otp }, { headers: this.getAuthHeaders() });
  }
  resetPassword(email: string, otp: string, newPassword: string) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/reset-password`,
      { email, otp, newPassword },
      { headers: this.getAuthHeaders() }
    );
  }
}
