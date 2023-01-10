import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'app/shared/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router, private http:HttpService, private aroute: ActivatedRoute) { }

  ngOnInit() {
    if (typeof(localStorage.getItem("user"))!=='undefined') {
      window.alert("New registraion will log our your current account");
    }
    localStorage.clear();
  }

  regtoken: string = "";
  error:string | null = "";
  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(40)]),
    username: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
    password: new FormControl('', [Validators.required, this.forbiddenPassword.bind(this), Validators.minLength(6), Validators.maxLength(40)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)])
  });

  forbiddenPassword(control: FormControl) {
    if (!control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/))
    {
      return {'passwordIsForbidden': true};
    }
    return null;
  }

  submit() {
    this.aroute.paramMap.subscribe(params => {
      this.regtoken = params.get('regtoken') ?? '';
    });
    if (this.regtoken == '') {
      this.error = "No registration token found";
      return;
    }
    if (this.form.value.password !== this.form.value.cpassword) { // if failed
      this.error = "Comfirm password does not match password";
      setTimeout(()=>{this.error = ''},2000);
    }
    else { // if success and ready to submit
      this.http.createUser(this.form.value, this.regtoken).subscribe({
        next:(res)=>{ // if request ok
          window.alert("Successfully signed up");
          this.router.navigate(['/signin']);
        },
        error:(res)=>{ // if request failed
          this.error = "User or email already exist";
          setTimeout(()=>{this.error = ''},2000);
        }
      });
    }
  }

  goLogin() {
    this.router.navigate(['/signin']);
  }
}
