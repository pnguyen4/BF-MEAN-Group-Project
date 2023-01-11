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
  visa = "/employee/visa-status";
  housing = "/employee/housing";

  ngOnInit(): void {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
// "/employee/onboarding-application"
}
