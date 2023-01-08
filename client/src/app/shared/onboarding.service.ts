import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private http: HttpClient) { }

  createOnboardingApplication(application: Object): Observable<any> {
    return this.http.post(`${API_URL}/api/applications`, {application});
  }
}
