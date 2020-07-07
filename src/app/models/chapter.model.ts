export class Chapter{
    id: string;
    name: string;    
    cover: string;
    bookId: string;
   
    constructor(obj){
        this.id = obj.id || '';
        this.name = obj.name || '';        
        this.cover = obj.cover || '';
        this.bookId = obj.bookId || '';    
    }
}