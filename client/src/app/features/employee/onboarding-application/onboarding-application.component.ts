import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { S3ServiceService } from '../../../shared/s3-service.service';
import { Md5 } from 'ts-md5';
import { OnboardingService } from '../../../shared/onboarding.service';
import { User } from '../../../shared/data.model';

const S3_URL = "https://bfmean2022.s3.amazonaws.com/";

@Component({
  selector: 'app-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrls: ['./onboarding-application.component.scss']
})
export class OnboardingApplicationComponent implements OnInit {

  driverLicenseUrl = '';

  // TODO: input validation
  applicationForm: FormGroup = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    middlename: [''],
    preferredname: [''],

    email: ['', [Validators.required, Validators.email]],
    cellphone: ['', Validators.required],
    workphone: [''],
    ssn: ['', Validators.required],

    driverLicense: this.fb.nonNullable.group({
      number: ['', Validators.required],
      expiration: ['', Validators.required],
      //imgUrl: ['', Validators.required]  // I handled this elsewhere
    }),

    currentAddress: this.fb.nonNullable.group({
      street: ['', Validators.required],
      suiteOrAptNumber: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    }),

    reference: this.fb.nonNullable.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),

    emergencyContact: this.fb.nonNullable.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),

    isCitizenUSA: [false, Validators.required],
    // TODO: add input field for uploading OPT Receipt, use this field to store link to document on AWS S3
  });

  constructor(private fb: FormBuilder,
              private onboardingService: OnboardingService,
              private s3Service: S3ServiceService) { }

  ngOnInit(): void {

  }

  driverLicenseFileSelect(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.driverLicenseUrl = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  submit(): void {
    if (this.applicationForm.valid) {
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      const userobj: User = JSON.parse(user);

      let formdata = this.applicationForm.getRawValue();
      formdata.driverLicense.imgUrl = this.driverLicenseUrl;
      formdata.user_id = userobj._id;

      this.onboardingService.createOnboardingApplication(formdata).subscribe(res => {
        // TODO save state to store
        console.log(res);
      });
    }
  }

}
