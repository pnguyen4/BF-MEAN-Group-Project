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
  userID: string | null = null;
  editID: string | null = null;

  constructor(
    private housingService: HousingService,
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder ) { }

    facReportCommentForm: FormGroup = this.fb.nonNullable.group({
      message: ['', Validators.required]
    })
    editCommentForm: FormGroup = this.fb.nonNullable.group({
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
    this.userID = userobj._id;
    if (!userobj?.housing_id) {
      return;
    }

    this.housingService.getHousingDetails(userobj.housing_id).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadHousing({house: res.house}));
    });

    this.route.paramMap.subscribe( params => {
      this.reportID = params.get('reportid') ?? '';
    } )

    this.housingService.getOneFacilityReport(userobj.housing_id, this.reportID).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadCurrentFacilityReport({
        currentReport: res.report
      }));
    });


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
        console.log(res)
        if (res.status == '200') {
          this.store.dispatch(EmployeeHousingAction.loadCurrentFacilityReport({
            currentReport: res.report
          }));

          // TODO: message thread not updating after comment submission; only after refresh

        } else {
          console.log(res);
        }
      });
    }
  }

  toggleEdit( messageID: string, msg: string): void {
    if( !this.editID ) {
      this.editID = messageID;
      this.editCommentForm = this.fb.nonNullable.group({
        message: [msg, Validators.required]
      })
    } else {
      this.editID = null;
      this.editCommentForm = this.fb.nonNullable.group({
        message: ['', Validators.required]
      })
    }

  }

  submitEdit( messageID: string, authorid: string ): void {
    let user = this.editCommentForm.valid
      ? localStorage.getItem('user')
      : null;
    let userobj: User = typeof user == 'string'
      ? JSON.parse(user)
      : null

    if( !userobj || userobj._id !== authorid ) return;

    let housing_id = '';
    this.housing$.subscribe(housing => {
      housing_id = housing._id;
    });

    const message = this.editCommentForm.getRawValue().message;

    this.housingService.editMsgOnFacilityReport(
      housing_id,
      this.reportID,
      messageID,
      message
    ).subscribe(res => {
        if (res.status == '200') {
          this.store.dispatch(
            EmployeeHousingAction.loadCurrentFacilityReport({ currentReport: res.report })
          );
        } else {
          // not sure how to handle errors
          console.log(res);
        }
      })
      this.toggleEdit(messageID, '');
  }
}
