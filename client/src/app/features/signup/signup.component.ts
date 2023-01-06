import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router:Router) { }
  error:string | null = "";
  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(20)]),
    username: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, this.forbiddenPassword.bind(this), Validators.minLength(6), Validators.maxLength(20)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  forbiddenPassword(control: FormControl) {
    if (!control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/))
    {
      return {'passwordIsForbidden': true};
    }
    return null;
  }

  submit() {
    if (this.form.value.password !== this.form.value.cpassword) {
      this.error = "Comfirm password does not match password";
      setTimeout(()=>{this.error = ''},2000);
    }
    console.log(this.form.value); // submit it
  }

  goLogin() {
    this.router.navigate(['/signin']);
  }
}
