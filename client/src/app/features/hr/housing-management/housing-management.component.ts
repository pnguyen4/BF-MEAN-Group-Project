import { Component, OnInit } from '@angular/core';
import { HousingService } from 'app/shared/housing.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit {

  housing: any[] = [];
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
              private router: Router) { }

  ngOnInit(): void {
    this.housingService.getHousingSummary().subscribe(res => {
    // TODO: remove this after migrating to ngrx and using async pipe
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
    // TODO: remove this after migrating to ngrx and using async pipe
    window.location.reload();
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
          // TODO: remove this after migrating to ngrx and using async pipe
          this.housing.push(res.house);
        }
      });
    }
  }
}
