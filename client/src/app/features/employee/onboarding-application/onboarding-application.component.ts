import { FormGroup, FormBuilder, Validators, NgControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { S3ServiceService } from '../../../shared/s3-service.service';
import { Md5 } from 'ts-md5';
import { OnboardingService } from '../../../shared/onboarding.service';
import { User } from '../../../shared/data.model';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/http.service';
import { Store } from '@ngrx/store';
import { saveUser } from '../../../store/user.action';

const S3_URL = "https://bfmean2022.s3.amazonaws.com/";

@Component({
  selector: 'app-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrls: ['./onboarding-application.component.scss']
})
export class OnboardingApplicationComponent implements OnInit {

  id = ''
  editMode = true;
  note = "";
  application: any = {}
  driverLicenseUrl = '';
  optReceiptUrl = '';
  user$ = this.store.select('user');
  disabled = false;

  applicationForm: FormGroup = this.fb.nonNullable.group({
    // no numbers
    firstname: ['', [Validators.required, Validators.minLength(2),
                     Validators.pattern(/^([^0-9]*)$/)]],
    lastname: ['', [Validators.required, Validators.minLength(2),
                     Validators.pattern(/^([^0-9]*)$/)]],
    middlename: ['', Validators.pattern(/^([^0-9]*)$/)],
    preferredname: ['', Validators.pattern(/^([^0-9]*)$/)],

    email: ['', [Validators.required, Validators.email]],
    cellphone: ['', [Validators.required,
                     Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
    workphone: ['', [Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
    ssn: ['', [Validators.required,
               Validators.pattern(/^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\1(?!0000)[0-9]{4}$/)]],

    driverLicense: this.fb.nonNullable.group({
      number: ['', [Validators.required, Validators.minLength(4)]],
      expiration: ['', Validators.required],
      //imgUrl: ['', Validators.required]  // I handled this elsewhere
    }),

    currentAddress: this.fb.nonNullable.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      suiteOrAptNumber: [''],
      city: ['',
             [Validators.required, Validators.minLength(2), Validators.pattern(/^([^0-9]*)$/)]],
      state: ['', [Validators.required, Validators.minLength(2),
                   Validators.pattern(/^([^0-9]*)$/)]],
      // 5 digit number or 5 digit number dash 4 digit number
      zipcode: ['', [Validators.required,
                     Validators.pattern(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/)]],
    }),

    reference: this.fb.nonNullable.group({
      firstname: ['', [Validators.required,
                  Validators.minLength(2), Validators.pattern(/^([^0-9]*)$/)]],
      lastname: ['', [Validators.required, Validators.minLength(2),
                      Validators.pattern(/^([^0-9]*)$/)]],
      // 10 digit number, seperators optional
      phone: ['', [Validators.required,
                   Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
    }),

    emergencyContact: this.fb.nonNullable.group({
      firstname: ['', [Validators.required, Validators.minLength(2),
                       Validators.pattern(/^([^0-9]*)$/)]],
      lastname: ['', [Validators.required, Validators.minLength(2),
                      Validators.pattern(/^([^0-9]*)$/)]],
      phone: ['', [Validators.required,
                   Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
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
              private store: Store<{user: User}>,
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

    this.user$.subscribe(user => {
      this.id = user.application_id;
      if (user.application_id) {
        this.httpService.getApplicationWithVisa(this.id).subscribe(res => {
          let startDate = '';
          let endDate = '';
          let expiration = '';
          if (res?.app?.visaStatus) {
            startDate = this.toDateStr(new Date(res?.app?.visaStatus.startDate));
            endDate = this.toDateStr(new Date(res?.app?.visaStatus.endDate));
          }
          expiration = this.toDateStr(new Date(res?.app?.driverLicense.expiration));
          // literally magic
          this.applicationForm.patchValue({
            ...res?.app,
            driverLicense: {
              number: res?.app?.driverLicense.number ?? '',
              expiration,
            },
            emergencyContact: res?.app?.emergencyContact[0] ?? {},
            workAuth: res?.app?.visaStatus?.workAuth,
            startDate,
            endDate,
          });
          this.application = res?.app;
          if (res?.app?.status == "pending") {
            this.note = "Form already submitted, please waiting HR's response";
            this.editMode = false;
            this.disabled = true;
            this.applicationForm.disable();
          } else if (res?.app.status == "approved") {
            this.editMode = false;
            this.disabled = true;
            this.applicationForm.disable();
            this.router.navigate(['/employee']); // shouldn't let approved fill out again
          }
          else if (res?.app?.status == "rejected"){ // rejected
            this.note = "Form have been rejected, please submit it again";
          }
        });
      }
    });
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
    if (!this.driverLicenseUrl) {
      return alert("Driver's license invalid or missing!");
    }

    if (this.applicationForm.valid) {
      let user = localStorage.getItem('user');
      if (typeof user != "string") return;
      let userobj: User = JSON.parse(user);

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
          console.log(res)
          this.id = res.application._id;
          let updateduser = {...userobj, 'application_id': this.id}
          localStorage.setItem('user', JSON.stringify(updateduser));
          this.store.dispatch(saveUser({userInfo: updateduser}));
      });
      window.alert("Submitted");
      //this.router.navigate(['/employee']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

}
