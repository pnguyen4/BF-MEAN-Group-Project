import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { S3ServiceService } from '../../../shared/s3-service.service';
import { Md5 } from 'ts-md5';
import { User, VisaStatus } from '../../../shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { Store } from '@ngrx/store';

const S3_URL = "https://bfmean2022.s3.amazonaws.com/";

@Component({
  selector: 'app-visa-status',
  templateUrl: './visa-status.component.html',
  styleUrls: ['./visa-status.component.scss']
})
export class VisaStatusComponent implements OnInit {

  user$ = this.store.select('user');
  disabled = true;

  OPTReceiptUrl = "";
  OPTEADurl = "";
  I983 = "";
  I20 = "";
  editMode = false;
  visaStatus = false;
  app:any;
  formStatus = "";

  constructor(private fb: FormBuilder,
    private store: Store<{user: User}>,
    private httpService: HttpService,
    private s3Service: S3ServiceService) { }

  ngOnInit(): void {
    //this.conditionalValidators();
    this.user$.subscribe(user => {
      this.httpService.getApplicationWithVisa(user.application_id).subscribe(res => {
        this.app = res.app;
        // Load all or any if available
        this.OPTReceiptUrl = this.app.visaStatus?.OptReceiptUrl;
        this.OPTEADurl = this.app.visaStatus?.OptEADurl;
        this.I983 = this.app.visaStatus?.I983;
        this.I20= this.app.visaStatus?.I20;
        this.formStatus = res.app.visaStatus.status;
        if (this.formStatus == "done") {
          this.applicationForm.disable();
        }
        let startDate = '';
        let endDate = '';
        if (this.app.visaStatus) {
          this.visaStatus = true;
          startDate = this.toDateStr(new Date(this.app.visaStatus.startDate));
          endDate = this.toDateStr(new Date(this.app.visaStatus.endDate));
        }
        this.applicationForm.patchValue({
          workAuth: this.app.visaStatus?.workAuth,
          startDate,
          endDate,
        });
      })
    });
  }

  applicationForm: FormGroup = this.fb.nonNullable.group({
    workAuth: [''],
    startDate: [''],
    endDate: ['']
  });

  /* NOTE: isCitizenUSA does not exist
  conditionalValidators() {
    const workAuth = this.applicationForm.get('workAuth');
    const startDate = this.applicationForm.get('startDate');
    const endDate = this.applicationForm.get('endDate');

    this.applicationForm.get('isCitizenUSA')?.valueChanges.subscribe(isCitizenUSA => {
      if (isCitizenUSA) {
        workAuth?.setValidators(null);
        startDate?.setValidators(null);
        endDate?.setValidators(null);
      } else {
        workAuth?.setValidators([Validators.required]);
        startDate?.setValidators([Validators.required]);
        endDate?.setValidators([Validators.required]);
      }
      workAuth?.updateValueAndValidity();
      startDate?.updateValueAndValidity();
      endDate?.updateValueAndValidity();
    });
  }
  */

  toDateStr(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const today = date.getFullYear()+"-"+(month)+"-"+(day);
    return today;
  }

  OPTReceiptUrlSelect(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.OPTReceiptUrl = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  OPTEADurlSelect(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.OPTEADurl = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  I983Select(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.I983 = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  I20Select(e: any): void {
    const file = e.target.files[0];
    const uniquename = `${Md5.hashStr(Math.random().toString())}-${file.name}`;
    this.s3Service.uploadFile(file, uniquename);
    this.I20 = `https://bfmean2022.s3.amazonaws.com/${uniquename}`;
  }

  submit() {
    let visa:VisaStatus = {
      _id: this.app.visaStatus._id,
      user_id: this.app.visaStatus.user_id,
      application_id: this.app.visaStatus.application_id,
      status: "pending",
      OPTReceiptUrl: this.OPTReceiptUrl,
      OPTEADurl: this.OPTEADurl,
      I983: this.I983,
      I20: this.I20,
      next: this.app.visaStatus.next,
      workAuth: this.app.visaStatus.workAuth,
      startDate: this.app.visaStatus.startDate,
      endDate: this.app.visaStatus.endDate
    }
    this.app.visaStatus = visa;
    this.httpService.editVisaById(visa).subscribe();
    this.disabled = true;
    this.applicationForm.disable();
    window.alert("Submitted");
    window.location.reload(); // cheap hack to redisplay updated information
  }

  edit() {
    this.disabled = false;
    this.applicationForm.enable();
  }
}
