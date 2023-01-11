import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  user$ = this.store.select('user');
  disabled = true;
  app_id = "";

  applicationForm: FormGroup = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    middlename: [''],
    preferredname: [''],

    email: ['', [Validators.required, Validators.email]],
    cellphone: ['', Validators.required],
    workphone: [''],
    ssn: ['', Validators.required],

    currentAddress: this.fb.nonNullable.group({
      street: ['', Validators.required],
      suiteOrAptNumber: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),

    emergencyContact: this.fb.nonNullable.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),
  });

  constructor(private fb: FormBuilder,
              private store: Store<{user: User}>,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.applicationForm.disable();
    this.user$.subscribe(user => {
      this.app_id = user.application_id;
      this.httpService.getApplicationById(user.application_id).subscribe(
        (res)=> {
          this.applicationForm.patchValue({
            firstname: res.app.firstname,
            lastname: res.app.lastname,
            middlename: res.app.middlename,
            preferredname: res.app.preferredname,
            email: res.app.email,
            cellphone: res.app.cellphone,
            workphone: res.app.workphone,
            ssn: res.app.ssn,
            currentAddress:{
              street: res.app.currentAddress.street,
              suiteOrAptNumber: res.app.currentAddress.suiteOrAptNumber,
              city: res.app.currentAddress.city,
              state: res.app.currentAddress.state,
              zipcode: res.app.currentAddress.zipcode
            },
            emergencyContact:{
              firstname: res.app.emergencyContact[0].firstname,
              lastname: res.app.emergencyContact[0].lastname,
              phone: res.app.emergencyContact[0].phone,
              email: res.app.emergencyContact[0].email
            }
          });
        }
      )
    })
  }

  edit() {
    this.disabled = false;
    this.applicationForm.enable();
  }

  submit(): void {
    this.httpService.editApplicationById(this.app_id,this.applicationForm.value).subscribe();
    this.disabled = true;
    this.applicationForm.disable();
    window.alert("Submitted");
  }
}

