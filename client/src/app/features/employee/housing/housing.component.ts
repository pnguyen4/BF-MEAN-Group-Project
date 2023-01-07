import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../shared/data.model';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss']
})
export class HousingComponent implements OnInit {

  housing: any = {};
  facReports: any[] = [];
  facReportForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private housingService: HousingService,
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
      this.housing = res.house;
      console.log(this.housing)
    });

    this.housingService.getHouseFacilityReports(userobj.housing_id).subscribe(res => {
      console.log(res.facReports);
      this.facReports = res.facReports;
    });
  }

  submit(): void {
    if (this.facReportForm.valid) {
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      const userobj: User = JSON.parse(user);
      const formdata = this.facReportForm.getRawValue();

      const facReport = {
        housing_id: this.housing._id,
        author_id:  userobj._id,
        status: "open",
        title: formdata.title,
        description: formdata.description,
        messages: []
      };

      this.housingService.createFacilityReport(this.housing._id, facReport).subscribe(res => {
        if (res.status == '200') {
          this.facReports.push(res.facReport);
        } else {
          console.log(res);
        }
      });
    }
  }

}
