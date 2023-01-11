import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/data.model';
import { Store } from '@ngrx/store';
import { saveUser } from './store/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<{ user: User }>){
    this.user$ = store.select('user');
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      const copy = JSON.parse(localStorage.getItem('user')!);
      const user:User = {
        _id:copy.id,
        username: copy.username,
        email:copy.email,
        //password:copy.password,
        admin:copy.admin,
        application_id: copy.application_id !== undefined ? copy.application_id : '',
        housing_id: copy.housing_id !== undefined ? copy.housing_id : ''
      }
      this.store.dispatch(saveUser({userInfo:user}));
    }
  }
}
