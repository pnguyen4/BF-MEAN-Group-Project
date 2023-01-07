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

  delete(houseid: string): void {
    this.housingService.deleteHousing(houseid).subscribe(res => {
      if (res.status == '200') {
        let idx = this.housing.findIndex(house => house._id == houseid);
        this.housing = this.housing.slice(idx, 1);
      }
    });
    // remove this after migrating to ngrx
    window.location.reload();
  }

  details(houseid: string): void {
    this.router.navigate([`/hr/housing-management/${houseid}`]);
  }
}
