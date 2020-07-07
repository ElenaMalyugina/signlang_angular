import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AccessRightService{
    getUserRights(): string[]{
        let userRights = [];
        try{
            userRights.push(JSON.parse(localStorage.getItem('userData'))['role']);
        }
        catch(e){

        }
        finally{
            return userRights;
        }
    }
}