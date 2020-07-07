import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models/userData.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    registration(userData: UserData):Observable<any>{
        return this.http.post(`${environment.baseApiUrl}/reg.php`, userData);               
    }

    constructor(private http: HttpClient) { }

}
