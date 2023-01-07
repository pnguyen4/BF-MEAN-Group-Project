import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {

  housing: any[] = [];

  constructor(private housingService: HousingService, protected router: Router) { }

  ngOnInit(): void {
    this.housingService.getHousingSummary().subscribe(res => {
      this.housing = res.houses;
      console.log(this.housing);
    });
  }

  details(houseid: string): void {
    this.router.navigate([`/hr/housing-management/${houseid}`]);
  }
}
