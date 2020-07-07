import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LessonPartService{
    getLessonParts(chapterId){
        return this.http.get(`${environment.baseApiUrl}/getLessonParts.php?chapterId=${chapterId}`);
    }

    getLessonPart(lessonPartId){
        return this.http.get(`${environment.baseApiUrl}/getLessonPart.php?id=${lessonPartId}`);
    }

    addLessonPart(lessonPart){
        return this.http.post(`${environment.baseApiUrl}/addLessonPart.php`, lessonPart);
    }

    editLessonPart(lessonPart){
        return this.http.put(`${environment.baseApiUrl}/editLessonPart.php`, lessonPart);
    }

    constructor(private http: HttpClient){}
}