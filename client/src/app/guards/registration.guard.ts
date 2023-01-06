import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RegistrationService } from '../services/registration.service';

// too long, made alias
type GuardType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardType {
    const regtoken = route.paramMap.get('regtoken');
    if (typeof regtoken === "string") {
      // only checks existence of token, server will verify later
      return /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(regtoken);
    }
    return false;
  }
  
}
