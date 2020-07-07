import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService{
    getUserData(userId): Observable<any>{
        return this.http.get(`${environment.baseApiUrl}/getUserData.php?id=${userId}`);
    }

    changeUserData(userData): Observable<any>{
        return this.http.put(`${environment.baseApiUrl}/changeUserData.php`, userData);
    }

    changePassword(passData):Observable<any>{
        return this.http.put(`${environment.baseApiUrl}/changePassword.php`, passData);
    }

    constructor(private http: HttpClient){}

}