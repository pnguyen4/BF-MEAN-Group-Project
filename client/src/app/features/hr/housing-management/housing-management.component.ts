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
  houseForm: FormGroup = this.fb.group({
    street: ['', Validators.required],
    suiteOrAptNumber: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    fullname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
  });

  constructor(private housingService: HousingService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.housingService.getHousingSummary().subscribe(res => {
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
    console.log("test")
  }
}
