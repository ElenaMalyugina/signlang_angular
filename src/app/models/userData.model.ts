export class UserData{
    userId: string;
    login: string;
    password: string;
    role: string;
    photo: string;    
    firstName: string;
    lastName: string;   

    constructor(obj){
        this.userId = obj.userId || null;
        this.login = obj.login || null;
        this.password = obj.password || null;
        this.role = obj.role || null;
        this.photo = obj.photo || null;
        this.firstName = obj.firstName || null;
        this.lastName = obj.lastName || null;               
    }
}
