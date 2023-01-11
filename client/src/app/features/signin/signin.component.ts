import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'app/shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { Observable } from 'rxjs';
import { saveUser } from '../../store/user.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user$: Observable<User>;

  constructor(private router:Router, private http:HttpService, private store: Store<{ user: User, isOnboarding: boolean }>) {
    this.user$ = store.select('user');
  }

  error:string | null = "";

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    account: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(40)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(40)]),
  });

  submit() {
    this.http.signin(this.form.value).subscribe(res => { // if request ok
      if (res.status == '200') {
        window.alert("Successful sign in");
        const user:User = {
          _id:res.user.id,
          username: res.user.username,
          email:res.user.email,
          //password:res.user.password,
          admin:res.user.admin,
          application_id: res.user.application_id !== undefined ? res.user.application_id : '',
          housing_id: res.user.housing_id !== undefined ? res.user.housing_id : ''
        }

        this.store.dispatch(saveUser({userInfo:user}));
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.user.admin) {
          this.router.navigate(['/hr']);
        }
        else {
          this.router.navigate(['/employee']);
        }
      } else {
        this.error = res.msg;
        setTimeout(()=>{this.error = ''},2000);
      }
    });
  }
}

