import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BooksService{
    getBooks():Observable<any>{
        let userId;

        try{
            userId = JSON.parse(localStorage.getItem('userData'))['userId'];
        }
        catch(e){}
        return this.http.get(`${environment.baseApiUrl}/getBooks.php?userId=${userId}`);
    }

    getBook(bookId: string):Observable<any>{
        return this.http.get(`${environment.baseApiUrl}/getBook.php?bookId=${bookId}`);
    }

    getBookName(bookId: string):Observable<any>{
        return this.http.get(`${environment.baseApiUrl}/getBookName.php?bookId=${bookId}`);
    }

    addBook(book): Observable<any>{
        return this.http.post(`${environment.baseApiUrl}/addBook.php`, book);
    }

    editBook(book): Observable<any>{
        return this.http.put(`${environment.baseApiUrl}/editBook.php`, book);
    }

    constructor(private http: HttpClient){}
}