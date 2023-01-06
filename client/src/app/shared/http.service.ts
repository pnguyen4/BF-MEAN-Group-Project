import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private router:Router, private http:HttpClient) { }

  createUser(userInfo:any) {
    const user: User = { // create model
      _id:'',
      username:userInfo.username,
      email:userInfo.email,
      password:userInfo.password,
      admin:true,
      application_id:'',
      housing_id:''
    }
    return this.http.post("http://localhost:3000/api/users", user); // send http request
  }

  checkUserByPassword(userInfo:any) {
    const user: any = { // create model
      account:userInfo.account,
      password:userInfo.password
    }
    return this.http.post<{message:string}>("http://localhost:3000/api/users/:account", user); // check login
  }

  getUserByAccount(userInfo:any) {
    return this.http.get<{user:any,token:any,expiresAt:number}>("http://localhost:3000/api/users/"+userInfo.account); // get user
  }
}
