import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Application, User, VisaStatus } from './data.model';
import { Observable } from 'rxjs';

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
      //password:userInfo.password,
      admin:false,
      application_id:'',
      housing_id:''
    }
    return this.http.post("http://localhost:3000/api/users", {...user, password: userInfo.password}, {headers}); // send http request
  }

  signin(userInfo:any): Observable<any> { // get user with password: for login
    const user: any = { // create model
      account:userInfo.account,
      password:userInfo.password
    }
    return this.http.post("http://localhost:3000/api/users/signin", user); // check login
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

  // just a getter for a single field
  getApplicationStatus(id: string) {
    return this.http.get<any>("http://localhost:3000/api/applications/"+id+"/status");
  }

  getApplicationWithVisa(id: string) {
    return this.http.get<any>("http://localhost:3000/api/applications/"+id+"/withvisa");
  }

  editApplication(id: string, values: any) {
    return this.http.put<any>("http://localhost:3000/api/applications/"+id, {id, values});
  }

  editVisaApprove(id:string) {
    return this.http.put("http://localhost:3000/api/visaStatus/"+id,id);
  }

  editVisaReject(id:string) {
    return this.http.put("http://localhost:3000/api/visaStatus/"+id+'/'+id,id);
  }

  editApplicationById(id: string, values: any) {
    return this.http.put("http://localhost:3000/api/applications/"+id+"/"+id, {id, values});
  }
}
