import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../../shared/housing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../shared/data.model';
import { EmployeeHousingAction } from '../../../store/housing.action';
import { selectEmployeeHousing, selectFacReports } from '../../../store/housing.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss']
})
export class HousingComponent implements OnInit {

  housing$ = this.store.select(selectEmployeeHousing);
  facReports$ = this.store.select(selectFacReports);

  facReportForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private housingService: HousingService,
              private router: Router,
              private store: Store,
              private fb: FormBuilder) { }

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

    this.housingService.getHousingDetails(userobj.housing_id).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadHousing({house: res.house}));
    });

    this.housingService.getHouseFacilityReports(userobj.housing_id).subscribe(res => {
      this.store.dispatch(EmployeeHousingAction.loadFacilityReports({
        facReports: res.facReports
      }));
    });
  }

  submit(): void {
    if (this.facReportForm.valid) {
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      const userobj: User = JSON.parse(user);
      const formdata = this.facReportForm.getRawValue();

      let housing_id = '';
      this.housing$.subscribe(housing => {
        housing_id = housing._id;
      });

      let facReport = {
        author_id:  userobj._id,
        housing_id: housing_id,
        status: "open",
        title: formdata.title,
        description: formdata.description,
        messages: []
      };

      this.housingService.createFacilityReport(housing_id, facReport).subscribe(res => {
        if (res.status == '200') {
          this.store.dispatch(EmployeeHousingAction.createFacilityReport({
            facReport: res.facReport
          }));
        } else {
          console.log(res);
        }
      });
    }
  }

  comments(houseid: string, reportid: string): void {
    this.router.navigate([`/employee/housing/${houseid}/reports/${reportid}`]);
  }
}
