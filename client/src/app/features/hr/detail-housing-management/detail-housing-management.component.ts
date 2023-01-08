import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Store } from '@ngrx/store';
import { EmployeeHousingAction } from '../../../store/housing.action';
import { selectEmployeeHousing, selectFacReports } from '../../../store/housing.selector';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-detail-housing-management',
  templateUrl: './detail-housing-management.component.html',
  styleUrls: ['./detail-housing-management.component.scss']
})
export class DetailHousingManagementComponent implements OnInit {

  housing$ = this.store.select(selectEmployeeHousing);
  facReports$ = this.store.select(selectFacReports);
  houseid: string = 'default';

  constructor(private housingService: HousingService,
              private _activatedRoute: ActivatedRoute,
              private store: Store) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.houseid = params['housingid'];
    });

    this.housingService.getHousingDetails(this.houseid).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadHousing({house: res.house}));
    });

    this.housingService.getHouseFacilityReports(this.houseid).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadFacilityReports({
        facReports: res.facReports
      }));
    });
  }

}
