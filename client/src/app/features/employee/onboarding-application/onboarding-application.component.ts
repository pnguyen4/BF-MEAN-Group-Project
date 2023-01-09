import { FormGroup, FormBuilder, Validators, NgControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { S3ServiceService } from '../../../shared/s3-service.service';
import { Md5 } from 'ts-md5';
import { OnboardingService } from '../../../shared/onboarding.service';
import { User } from '../../../shared/data.model';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/http.service';

const S3_URL = "https://bfmean2022.s3.amazonaws.com/";

@Component({
  selector: 'app-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrls: ['./onboarding-application.component.scss']
})
export class OnboardingApplicationComponent implements OnInit {

  editMode = true;
  application: any = {}
  driverLicenseUrl = '';
  optReceiptUrl = '';

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
      zipcode: ['', Validators.required],
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

    // TODO: conditional validatotion based on whether or not isCitizenUSA is true
    workAuth: [''],
    //OptReceiptUrl: [''], // handled this elsewhere
    // TODO: if other workAuth, have input box to specify visa title
    startDate: [''],
    endDate: ['']
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private onboardingService: OnboardingService,
              private s3Service: S3ServiceService) { }

  toDateStr(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const today = date.getFullYear()+"-"+(month)+"-"+(day);
    return today;
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    const id = user?.application_id;
    if (id) {
      this.httpService.getApplicationWithVisa(id).subscribe(res => {
        const startDate = this.toDateStr(new Date(res.app.visaStatus.startDate));
        const endDate = this.toDateStr(new Date(res.app.visaStatus.endDate));
        const expiration = this.toDateStr(new Date(res.app.driverLicense.expiration));
        // literally magic
        this.applicationForm.patchValue({
          ...res.app,
          driverLicense: {
            number: res.app.driverLicense.number,
            expiration,
          },
          emergencyContact: res.app.emergencyContact[0],
          workAuth: res.app.visaStatus.workAuth,
          startDate,
          endDate,
        });
        this.application = res.app;
        if (res.app.status == "pending") {
          this.editMode = false;
          this.applicationForm.disable();
        }
      });
    }
  }

  driverLicenseFileSelect(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.driverLicenseUrl = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  optFileSelect(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.optReceiptUrl = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  submit(): void {
    if (this.driverLicenseUrl) {
      return alert("Driver's license invalid or missing!");
    }

    if (this.applicationForm.valid) {
      console.log('valid')
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      const userobj: User = JSON.parse(user);

      let formdata = this.applicationForm.getRawValue();
      formdata.driverLicense.imgUrl = this.driverLicenseUrl;
      formdata.user_id = userobj._id;

      let {workAuth, startDate, endDate, ...application} = formdata;
      let visaStatus = {};
      if (!formdata.isCitizenUSA) {
        visaStatus = { OPTReceiptUrl: this.optReceiptUrl, workAuth, startDate, endDate };
      }
      this.onboardingService.createOnboardingApplication(application, visaStatus)
        .subscribe(res => {
          // TODO save state to store
          console.log(res);
      });
      this.router.navigate(['/employee']);
    }
  }

}
