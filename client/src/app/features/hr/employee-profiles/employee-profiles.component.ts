
import { Component, OnInit } from '@angular/core';
import { Address, Application, SimpleUser, User, VisaStatus } from 'app/shared/data.model';
import { HttpService } from 'app/shared/http.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.scss']
})
export class EmployeeProfilesComponent implements OnInit {

  searchInputSubject = new Subject<string>();
  searchInput = "";
  displayedColumns: string[] = ['username', 'email', 'admin', 'more'];
  dataSource!:User[];
  userDetail:Application = new Application("","",0,"","","","","",new Address("","","","","",""),0,0,0,new SimpleUser("","","",0,""),[],false,"",{number:"",expiration:"",imgUrl:""});

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
          this.userDetail = new Application("","",0,"","","","","",new Address("","","","","",""),0,0,0,new SimpleUser("","","",0,""),[],false,"",{number:"",expiration:"",imgUrl:""});
          this.http.getUserAll().subscribe(
            (value)=> {
              this.dataSource = value.users;
            }
          )
        }
      });
  }

  getApplication(id:string) {
    if (!id) {
      window.alert("User's application no exist");
    }
    else {
      this.http.getApplicationById(id).subscribe(
        (res)=>{
          this.userDetail = res.app;
        }
      );
    }
  }
}

