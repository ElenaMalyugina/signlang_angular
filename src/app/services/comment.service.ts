import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService{
    getComments(entityId){
        return this.http.get(`${environment.baseApiUrl}/getComments.php?entityId=${entityId}`);
    }

    addComment(comment){
        return this.http.post(`${environment.baseApiUrl}/addComment.php`, comment);
    }

    constructor(private http: HttpClient){}
}