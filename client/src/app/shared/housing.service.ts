import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getHousingDetails(id: string): Observable<any> {
    return this.http.get(`${API_URL}/api/housing/${id}`);
  }

  getHousingSummary(): Observable<any> {
    return this.http.get(`${API_URL}/api/housing`);
  }

  createHousing(landlord: Object, address: Object): Observable<any> {
    return this.http.post(`${API_URL}/api/housing`, {landlord, address});
  }

  deleteHousing(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/housing/${id}`);
  }

}
