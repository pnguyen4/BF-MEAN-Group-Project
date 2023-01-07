import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private router:Router, private http:HttpClient) { }

  createUser(userInfo:any, regtoken: string) {
    const headers = new HttpHeaders().set('Authorization', regtoken);

    const user: User = { // create model
      _id:'',
      username:userInfo.username,
      email:userInfo.email,
      password:userInfo.password,
      admin:false,
      application_id:'',
      housing_id:''
    }
    return this.http.post("http://localhost:3000/api/users", user, {headers}); // send http request
  }

  checkUserByPassword(userInfo:any) { // get user with password: for login
    const user: any = { // create model
      account:userInfo.account,
      password:userInfo.password
    }
    return this.http.post<{message:string}>("http://localhost:3000/api/users/:account", user); // check login
  }

  getUserByAccount(userInfo:any) {
    return this.http.get<{user:any,token:any,expiresAt:number}>("http://localhost:3000/api/users/"+userInfo.account); // get user
  }

  editUserWithPassword(userInfo:any) { // must include password changing
    return this.http.put<{message:string}>("http://localhost:3000/api/users/"+userInfo.email,userInfo)
    .subscribe(
      (val)=>{
        console.log("Successfully edited");
      }
    );
  }
}
