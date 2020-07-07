import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData: Subject<UserData>= new Subject();  
  get userRole(): string{ 
    try{
      return <string>JSON.parse(localStorage.getItem('userData'))['role'];
    }
    catch(e){
      return null;
    }
  }

 
  login(userData: UserData):Observable<any>{
    return this.http.post(`${environment.baseApiUrl}/auth.php`, userData, {withCredentials: true})
                    .pipe(
                      map((resp)=>{
                        localStorage.setItem('userData', JSON.stringify(resp));
                        this.userData.next(new UserData(resp));
                        return resp;
                      })                      
                    )
  }

  logout(){
    this.http.get(`${environment.baseApiUrl}/logout.php`, {withCredentials: true})
      .subscribe(
        _=>{
          localStorage.removeItem('userData');
          this.router.navigateByUrl('/login');
          this.userData.next(new UserData({}));          
      })   
  }

  constructor(private http: HttpClient, private router: Router) { }
}
