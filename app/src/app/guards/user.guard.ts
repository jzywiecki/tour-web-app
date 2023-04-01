import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if(this.authService.loggedUser?.role == "User" || this.authService.loggedUser?.role == "Manager" || this.authService.loggedUser?.role == "Admin") {
        return true;
      }
      this.router.navigate(['rejection']); 
      return false;
  }
  
}
