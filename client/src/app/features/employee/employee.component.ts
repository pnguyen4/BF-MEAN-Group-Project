import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private router:Router, private store: Store<{ isOnboarding: boolean }>) {

  }

  ngOnInit(): void {
    this.store.select('isOnboarding').subscribe((res)=>{
      if (!res) {
        this.router.navigate(['/employee/onboarding-application']);
      }
    });
  }

}
