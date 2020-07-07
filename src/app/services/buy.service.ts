import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BuyService{
    buyBook(bookId): Observable<any>{
        let userId;

        try{
            userId = JSON.parse(localStorage.getItem('userData'))['userId'];
        }
        catch(e){}

        const sendData = {
            bookId: bookId,
            userId: userId
        }
        return this.http.post(`${environment.baseApiUrl}/buy.php`, sendData);
    }

    constructor(private http: HttpClient){}
}