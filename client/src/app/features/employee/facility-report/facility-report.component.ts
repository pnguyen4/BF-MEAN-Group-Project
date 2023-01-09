import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Store } from '@ngrx/store';
import { User } from 'app/shared/data.model';
import { selectFacReports } from 'app/store/housing.selector';

@Component({
  selector: 'app-facility-report',
  templateUrl: './facility-report.component.html',
  styleUrls: ['./facility-report.component.scss']
})
export class FacilityReportComponent implements OnInit {

  // [single] facReport$ = this.store.select(selectFacReport)

  constructor(
    private housingService: HousingService,
    private store: Store) { }

  ngOnInit(): void {
    // user check
    let user = localStorage.getItem('user');
    if (typeof user != "string") {
      return;
    }

    // should implement user._id === facReport.author_id after confirmation of data fetch
    let userobj: User = JSON.parse(user);
    if (!userobj?.housing_id) {
      return;
    }

    // housingService.getFacReportDetails.subscribe then this.store.dispatch
  }

}
