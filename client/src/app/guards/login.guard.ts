import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../shared/data.model';

type GuardType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardType {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (!(token && user)) return true;

    let userobj: User = JSON.parse(user);
    if (userobj.admin) {
      this.router.navigate(['/hr']);
    } else {
      this.router.navigate(['/employee']);
    }
    return false;
  }
  
}
