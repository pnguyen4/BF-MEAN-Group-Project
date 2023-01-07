import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';

import { User } from '../../../shared/data.model';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss']
})
export class HousingComponent implements OnInit {

  housing: any = {};

  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    // should never be null on this page, but typescript insists
    if (typeof user != "string") {
      return;
    }

    let userobj: User = JSON.parse(user);
    if (!userobj?.housing_id) {
      return;
    }

    this.housingService.getHousingDetails(userobj.housing_id).subscribe(house => {
      this.housing = house;
      console.log(this.housing)
    });
  }

}
