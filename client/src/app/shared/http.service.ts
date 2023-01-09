import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Application, User, VisaStatus } from './data.model';

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

  getUserByKeyword(keyword:string) {
    return this.http.get<{users:User[]}>("http://localhost:3000/api/users/"+keyword+'/'+keyword);
  }

  getApplicationById(id:string) {
    return this.http.get<{app:Application}>("http://localhost:3000/api/applications/"+id);
  }

  getVisaById(id:string) {
    return this.http.get<{visa:VisaStatus}>("http://localhost:3000/api/visaStatus/"+id);
  }

  editVisaById(visa:VisaStatus) {
    return this.http.post("http://localhost:3000/api/visaStatus/"+visa._id,visa);
  }

  getVisaAll() {
    return this.http.get<{visa:VisaStatus[]}>("http://localhost:3000/api/visaStatus");
  }

  getUserAll() {
    return this.http.get<{users:User[]}>("http://localhost:3000/api/users");
  }

  getApplicationAll() {
    return this.http.get<{app:Application[]}>("http://localhost:3000/api/applications");
  }

  editVisaApprove(id:string) {
    return this.http.put("http://localhost:3000/api/visaStatus/"+id,id);
  }

  editVisaReject(id:string) {
    return this.http.put("http://localhost:3000/api/visaStatus/"+id+'/'+id,id);
  }
}
