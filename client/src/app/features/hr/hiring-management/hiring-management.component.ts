import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../../services/registration.service';
import { HttpService } from 'app/shared/http.service';
import { Store } from '@ngrx/store';
import { selectAllApplications,
         selectCurrentApplication } from 'app/store/application.selector';
import { HrApplicationAction } from 'app/store/application.action';
import { selectAllRegisterTokens } from 'app/store/registerToken.selector';
import { HrRegisterTokenAction } from 'app/store/registerToken.action';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {

  registerTokens$ = this.store.select(selectAllRegisterTokens);
  applications$ = this.store.select(selectAllApplications);
  applicationDetail$ = this.store.select(selectCurrentApplication);
  currentid = '';
  feedback = new FormControl('');
  toggleView = false;
  displayedPendingColumns: string[] = ['fullname', 'email', 'more'];

  newEmployeeForm: FormGroup = this.fb.nonNullable.group ({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private store: Store,
              private registrationService: RegistrationService,
              private http:HttpService) {}

  ngOnInit(): void {
    this.http.getApplicationAll().subscribe(res => {
      this.store.dispatch(HrApplicationAction.loadAllApplications({applications: res.app}))
    });
    this.registrationService.getAllRegToken().subscribe(res => {
      this.store.dispatch(HrRegisterTokenAction.loadAllRegisterTokens({
        registerTokens: res.regtokens
      }));
    });
  }

  submit(): void {
    if (this.newEmployeeForm.get('email')?.errors) {
      return alert("must have valid email for new employee");
    }
    if (this.newEmployeeForm.get('name')?.errors) {
      return alert("must include employee full name");
    }
    const email: string = this.newEmployeeForm.value.email;
    const name: string = this.newEmployeeForm.value.name;

    this.registrationService.generateRegTokenAndEmail(email, name).subscribe();
    window.alert("Email Sent");
  }

  getApplicationInfo(item: any): void {
    this.toggleView = true;
    this.store.dispatch(HrApplicationAction.loadCurrentApplication({application: item}));
    this.applicationDetail$.subscribe(application => this.currentid = application._id)
  }

  updateStatus(status: string): void {
    // step 1: update item in store, update view
    this.store.dispatch(HrApplicationAction.updateApplication({
      id: this.currentid,
      field: 'status',
      value: status
    }));
    // step 2: save this change to database
    this.http.editApplication(this.currentid, {status}).subscribe(res => {
      console.log(res);
    });
  }

  rejectWithFeedback(): void {
    // provide feedback then update status
    this.store.dispatch(HrApplicationAction.updateApplication({
      id: this.currentid,
      field: 'feedback',
      value: this.feedback.value ?? ''
    }));
    this.http.editApplication(this.currentid, {feedback: this.feedback.value}).subscribe(res => {
      console.log(res);
    });
    this.updateStatus("rejected");
  }
}
