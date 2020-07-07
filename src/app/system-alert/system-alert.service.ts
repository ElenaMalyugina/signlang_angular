import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SystemAlertModel } from './systemAlertModel';

@Injectable({
   providedIn: 'root'
})
export class SystemAlertService{
    message: Subject<SystemAlertModel[]> = new Subject();
    private alerts: SystemAlertModel[] =[];

    setAlert(message: string, type: string){
        this.alerts.push(new SystemAlertModel(message, type))
        this.message.next(this.alerts);
        setTimeout(()=>{
            this.alerts = [];
            this.message.next(this.alerts);
        }, 3000)
    }
}

