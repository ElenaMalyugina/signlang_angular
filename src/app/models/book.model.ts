export class Book{
    id: string;
    name: string;
    author: string;
    picture: string;
    price: number;
    isBought: boolean;

    constructor(obj){
        this.id = obj.id || '';
        this.name = obj.name || '';
        this.author = obj.author || '';
        this.picture = obj.picture || '';
        this.price = obj.price || '',
        this.isBought = obj.isBought || false
    }
}