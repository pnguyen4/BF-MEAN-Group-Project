import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getHousingDetails(id: string) {
    return this.http.get(`${API_URL}/api/housing/${id}`);
  }

}
