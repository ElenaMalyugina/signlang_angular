import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChaptersService{
    getChapters(bookId:string):Observable<any>{
        return this.http.get(`${environment.baseApiUrl}/getChapters.php?bookId=${bookId}`);
    }

    getChapter(chapterId): Observable<any>{
        return this.http.get(`${environment.baseApiUrl}/getChapter.php?chapterId=${chapterId}`);
    }

    addChapter(chapter){
        return this.http.post(`${environment.baseApiUrl}/addChapter.php`, chapter);
    }

    editChapter(chapter){
        return this.http.put(`${environment.baseApiUrl}/editChapter.php`, chapter);
    }

    

    constructor(private http: HttpClient){}
}