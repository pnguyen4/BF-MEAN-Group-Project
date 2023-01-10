import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.scss']
})
export class EmployeeNavbarComponent implements OnInit {

  constructor(private router:Router, private store: Store<{ isOnboarding: boolean }>) {

  }

  employee = "/employee";
  information = "/employee/personal-information";
  visa = "/employee/personal-information";
  housing = "/employee/housing";

  ngOnInit(): void {
    this.store.select('isOnboarding').subscribe((res)=>{
      if (!res) {
        this.employee = "/employee/onboarding-application";
        this.information = "/employee/onboarding-application";
        this.visa = "/employee/onboarding-application";
        this.housing = "/employee/onboarding-application";
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
// "/employee/onboarding-application"
}
