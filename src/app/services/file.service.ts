import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService{
    private createFormData(file, id?){            
        const formData = new FormData();
        formData.append('sendFile', file);  
        if(id){
            formData.append('entityId', id);  
        }
        return formData;                
    }

    sendUserPhoto(file, id){
        if (file) {
            const formData = this.createFormData(file, id);
            return this.http.post(`${environment.baseApiUrl}/sendUserPhoto.php`, formData);
        }
    }

    sendBookCover(file, id){
        if (file) {
            const formData = this.createFormData(file, id);
            return this.http.post(`${environment.baseApiUrl}/sendBookCover.php`, formData);
        }
    }

    sendChapterCover(file, id){
        if (file) {
            const formData = this.createFormData(file, id);
            return this.http.post(`${environment.baseApiUrl}/sendChapterCover.php`, formData);
        }
    }

    sendVideo(file){
        if (file) {
            const formData = this.createFormData(file);
            return this.http.post(`${environment.baseApiUrl}/addVideo.php`, formData);
        }
    }

   

    constructor(private http: HttpClient){}
}