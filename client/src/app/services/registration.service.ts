import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  generateRegTokenAndEmail(email: string, name: string): Observable<any> {
    return this.http.post(`${API_URL}/api/regtokens`, {email, name});
  }

  isValidRegToken(token: string): Observable<any> {
    return this.http.get(`${API_URL}/api/verifyregtoken/${token}`);
  }
}
