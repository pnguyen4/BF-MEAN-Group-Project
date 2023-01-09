import { EmployeeHousingAction } from './../../../store/housing.action';
import { selectOneFacReport } from './../../../store/housing.selector';
import { Report } from './../../../shared/data.model';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Store } from '@ngrx/store';
import { User } from 'app/shared/data.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-facility-report',
  templateUrl: './facility-report.component.html',
  styleUrls: ['./facility-report.component.scss']
})
export class FacilityReportComponent implements OnInit {

  // [single] facReport$ = this.store.select(selectFacReport)

  report$ = this.store.select(selectOneFacReport);
  reportID: string | null = "";

  constructor(
    private housingService: HousingService,
    private store: Store,
    private route: ActivatedRoute ) { }


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

    this.route.paramMap.subscribe( params => {
      this.reportID = params.get('reportid');
    } )

    if( this.reportID ) {
      this.housingService.getOneFacilityReport(userobj.housing_id, this.reportID).subscribe(res => {
        this.store.dispatch(EmployeeHousingAction.loadOneFacilityReport({
          report: res.report
        }));
      });
    }

    // housingService.getFacReportDetails.subscribe then this.store.dispatch
  }

}
