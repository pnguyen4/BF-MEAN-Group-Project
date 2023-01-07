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

  createHousing(landlord: Object, address: Object, facilities: string): Observable<any> {
    return this.http.post(`${API_URL}/api/housing`, {landlord, address, facilities});
  }

  deleteHousing(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/housing/${id}`);
  }

  getHouseFacilityReports(id: string): Observable<any> {
    return this.http.get(`${API_URL}/api/housing/${id}/reports`);
  }

  createFacilityReport(id: string, facReport: Object): Observable<any> {
    return this.http.post(`${API_URL}/api/housing/${id}/reports`, facReport);
  }

}
