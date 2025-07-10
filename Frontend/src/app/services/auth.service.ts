import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiBaseUrl}/auth`;
  
  constructor(private http: HttpClient) { }

  register(data: {email:string; password:string;}): Observable<any> {
    return this.http.post(`${this.url}/register`, data);
  }

  login(data: {email:string; password:string}):Observable<any> {
    return this.http.post(`${this.url}/login`,data);
  }
}
