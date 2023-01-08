import { Component, OnInit } from '@angular/core';
import { Address, Application, SimpleUser, User, VisaStatus } from 'app/shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-visa-management',
  templateUrl: './visa-management.component.html',
  styleUrls: ['./visa-management.component.scss']
})
export class VisaManagementComponent implements OnInit {

  searchInputSubject = new Subject<string>();
  searchInput = "";
  displayedColumns: string[] = ['username', 'email', 'admin', 'more'];
  dataSource!:User[];
  userDetail:Application = new Application("","",0,"","","","","",new Address("","","","","",""),0,0,0,new SimpleUser("","","",0,""),[],false,"","",{number:"",expiration:"",imgUrl:""});
  visaDetail:any = new VisaStatus('','','','','','','');

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getUserAll().subscribe(
      (value)=> {
        this.dataSource = value.users;
      }
    )

    this.searchInputSubject.pipe(
      debounceTime(600),
      distinctUntilChanged())
      .subscribe(value => {
        if (value) {
          this.http.getUserByKeyword(value).subscribe(
            (value)=> {
              this.dataSource = value.users;
            }
          )
        }
        else {
          this.userDetail = new Application("","",0,"","","","","",new Address("","","","","",""),0,0,0,new SimpleUser("","","",0,""),[],false,"","",{number:"",expiration:"",imgUrl:""});
          this.http.getUserAll().subscribe(
            (value)=> {
              this.dataSource = value.users;
            }
          )
        }
      });
  }

  getApplication(id:string) {
    console.log(id);
    if (!id) {
      window.alert("User's application no exist");
    }
    else {
      this.http.getApplicationById(id).subscribe(
        (res)=>{
          this.userDetail = res.app;
          if (this.userDetail.visaStatus) {
            this.http.getVisaById(this.userDetail.visaStatus).subscribe(
              (res)=>{
                this.visaDetail = res;
                // here to get visa status
              }
            )
          }
          else {

          }
        }
      );
    }
  }

}
