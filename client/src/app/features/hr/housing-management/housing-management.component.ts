import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Housing } from '../../../shared/data.model';
import { HrHousingAction } from '../../../store/housing.action';
import { selectAllHousing } from '../../../store/housing.selector';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {

  housing$ = this.store.select(selectAllHousing);
  houseForm: FormGroup = this.fb.nonNullable.group({
    street: ['', Validators.required],
    suiteOrAptNumber: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    fullname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    facilities: ['']
  });

  constructor(private housingService: HousingService,
              private fb: FormBuilder,
              private store: Store,
              private router: Router) { }

  ngOnInit(): void {
    this.housingService.getHousingSummary().subscribe(res => {
      this.store.dispatch(HrHousingAction.loadAllHousing({houses: res.houses}));
    });
  }

  delete(houseid: string): void {
    this.housingService.deleteHousing(houseid).subscribe(res => {
      if (res.status == '200') {
        this.store.dispatch(HrHousingAction.deleteHousing({id: houseid}));
      }
    });
  }

  details(houseid: string): void {
    this.router.navigate([`/hr/housing-management/${houseid}`]);
  }

  submit(): void {
    if (this.houseForm.valid) {
      const formdata = this.houseForm.getRawValue();
      const landlord = {
        fullname: formdata.fullname,
        phone: formdata.phone,
        email: formdata.email
      };
      const address = {
        street: formdata.street,
        suiteOrAptNumber: formdata.suiteOrAptNumber,
        city: formdata.city,
        state: formdata.state,
        zipcode: formdata.zipcode
      }
      const facilities: string = formdata.facilities;
      this.housingService.createHousing(landlord, address, facilities).subscribe(res => {
        if (res.status == '200') {
          this.store.dispatch(HrHousingAction.createHousing({house: res.house}));
        }
      });
    }
  }
}
