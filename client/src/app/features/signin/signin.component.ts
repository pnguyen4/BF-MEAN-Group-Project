import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router:Router, private http:HttpService) { }

  error:string | null = "";
  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    account: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(40)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(40)]),
  });

  submit() {
    this.http.checkUserByPassword(this.form.value).subscribe({
      next:(res)=>{ // if request ok
        window.alert("Successful sign in");
        this.http.getUserByAccount(this.form.value).subscribe(
          (res)=>{
            console.log(res.token);
            console.log(res.user);
            console.log(res.expiresAt);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            if (res.user.admin) {
              this.router.navigate(['/hr']);
            } else {
              this.router.navigate(['/employee']);
            }
          }
        );
      },
      error:(res)=>{ // if request failed
        this.error = "Account not exist or password incorrect";
        setTimeout(()=>{this.error = ''},2000);
      }
    });
  }

  goRegister() {
    this.router.navigate(['/signup/1']);
  }

}

