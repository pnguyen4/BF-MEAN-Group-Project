import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
