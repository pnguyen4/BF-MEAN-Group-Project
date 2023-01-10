import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeHousingAction } from './../../../store/housing.action';
import { selectCurrentFacReport, selectEmployeeHousing } from './../../../store/housing.selector';
import { Report, ReportMessage } from './../../../shared/data.model';
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

  housing$ = this.store.select(selectEmployeeHousing);
  report$ = this.store.select(selectCurrentFacReport);
  reportID: string = "";

  constructor(
    private housingService: HousingService,
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder ) { }

    facReportCommentForm: FormGroup = this.fb.nonNullable.group({
      message: ['', Validators.required]
    })

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
      this.reportID = params.get('reportid') ?? '';
    } )

    this.housingService.getHousingDetails(userobj.housing_id).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadHousing({house: res.house}));
    });

    if( this.reportID ) {
      this.housingService.getOneFacilityReport(userobj.housing_id, this.reportID).subscribe(res => {
        this.store.dispatch(EmployeeHousingAction.loadCurrentFacilityReport({
          currentReport: res.report
        }));
      });
    }

    // housingService.getFacReportDetails.subscribe then this.store.dispatch
  }

  submit(): void {
    if (this.facReportCommentForm.valid) {
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      const userobj: User = JSON.parse(user);
      const formdata = this.facReportCommentForm.getRawValue();

      let housing_id = '';
      this.housing$.subscribe(housing => {
        housing_id = housing._id;
      });

      let msg: Object = {
        author_id:  userobj._id,
        message: formdata.message
      };

      this.housingService.addMsgToFacilityReport(housing_id, this.reportID, msg).subscribe(res => {
        if (res.status == '200') {
          this.store.dispatch(EmployeeHousingAction.loadCurrentFacilityReport({
            currentReport: res.report
          }));
          console.log(res.report.author_id.application_id.firstname)
        } else {
          console.log(res);
        }
      });
    }
  }
}
