import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean{
      let isLogin;

      try{
        isLogin = JSON.parse(localStorage.getItem('userData'))['login'];
      }
      catch(e){
        this.router.navigate(['/login'])  
        return false;
      }

      if(isLogin){
        return true;
      }
      else{
        this.router.navigate(['/login'])  
        return false;
      }
  }

  constructor(private router: Router){}
}