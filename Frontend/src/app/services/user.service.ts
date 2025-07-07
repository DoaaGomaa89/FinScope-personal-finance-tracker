import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Base_url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

getAuthHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


  userProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.Base_url}/profile/complition`, profileData,
      {
        headers: this.getAuthHeaders(),
        responseType: 'text'
      });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.Base_url}/profile`,
      {
        headers: this.getAuthHeaders()
      });
  }
}
