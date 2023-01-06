import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../shared/data.model';

type GuardType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class HrLoginGuard implements CanActivate {

  constructor(private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardType {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (typeof token != "string") { return false }
    if (typeof user != "string") { return false }

    let userobj: User = JSON.parse(user);
    if (userobj.admin) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
    return false;
  }
}
