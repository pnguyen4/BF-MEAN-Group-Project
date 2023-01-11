import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'app/shared/http.service';
import { saveOnboarding } from '../../store/isOnboarding.action';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private router:Router, private store: Store<{ isOnboarding: boolean }>, private http:HttpService) {

  }

  isOnboard=true;

  ngOnInit(): void {
    const copy = JSON.parse(localStorage.getItem('user')!);
    if (copy.application_id) { // user already submit form but unknown status
      this.http.getApplicationStatus(copy.application_id).subscribe(
        (res)=>{
          if (res.status === "approved") { // should redirect to employee

          }
          else {
            console.log("reject");
            this.isOnboard=false;
            this.router.navigate(['/employee/onboarding-application']);
          }
        }
      );
    }
    else { // user should onBoarding
      console.log("not exist");
      this.isOnboard=false;
      this.router.navigate(['/employee/onboarding-application']);
    }
  }

}
