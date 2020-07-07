import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkRight();
  }

  checkRight(): boolean{
      let isAdmin;

      try{
        isAdmin = JSON.parse(localStorage.getItem('userData'))['role'] === 'admin';
      }
      catch(e){
        //this.router.navigate(['/login'])  
        return false;
      }

      if(isAdmin){
        return true;
      }
      else{
        //this.router.navigate(['/login'])  
        return false;
      }
  }

  constructor(private router: Router){}
}