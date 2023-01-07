import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'app/shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { Observable } from 'rxjs';
import { saveUser } from '../../../store/user.action';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  user$: Observable<User>;
  user!:User;
  editMode = false;
  comfirm = "";
  error = "";

  constructor(private http:HttpService, private router:Router, private store: Store<{ user: User }>) {
    this.user$ = store.select('user');
    this.user$.subscribe((req)=>{
      this.user! = {
        _id: req._id,
        username:req.username,
        email:req.email,
        password:req.password,
        admin:req.admin,
        application_id:req.application_id,
        housing_id:req.housing_id,
      };
    });
  }

  ngOnInit() {}

  startEdit() {
    this.editMode = !this.editMode;
    this.user.password = '';
  }

  validation() {
    if (!this.user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/)) {
      this.error = "Invalid password format";
      return;
    }
    if (this.user.password !== this.comfirm) {
      this.error = "Comfirm password does not match";
      return;
    }
    this.error = '';

    this.editMode = !this.editMode;
    this.store.dispatch(saveUser({userInfo:this.user}));
    this.http.editUserWithPassword(this.user);
    window.alert("Successful edited");
    //this.router.navigate(['/host',this.user._id]);
  }
}
