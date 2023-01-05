import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router:Router) { }

  error:string | null = "";
  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    combo: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(20)]),
  });

  submit() {
    console.log(this.form.value);
  }

  goRegister() {
    this.router.navigate(['/signup/1']);
  }

}
