import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  constructor( private httpClient: HttpClient ) { }
  private rootUrl = `http://localhost:4200`
  public subject = new Subject();
  public applications: unknown;

  onSubscribe(): Observable<any> {
    return this.subject.asObservable();
  }

  getAllApplications() {
    this.httpClient.get(`${this.rootUrl}/api/onboarding-applications`).subscribe( res => {
      this.applications = res;
    } )
  }
}
