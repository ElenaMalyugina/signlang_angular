export class SystemAlertModel{
    message: string;
    alertType: string;


    constructor(message: string, alertType: string){
        this.message = message || null;
        this.alertType = alertType || 'info';
    }
}