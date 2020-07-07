import { Component, OnInit } from '@angular/core';
import { book } from '../books.mock';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { BuyService } from '../services/buy.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BookslistComponent implements OnInit {
  books:Book[] = [];
  pictureUrl=environment.baseApiUrl;

  getBooks(){
    this.bookService.getBooks().subscribe((books)=>{
      if(Array.isArray(books)){
          books.forEach(book=>{
          this.books.push(new Book(book))
        })
      }      
    });
  }

  buyBook(bookId){
    this.buyService.buyBook(bookId).subscribe(res => {
      this.books = [];
      this.getBooks();
    })
  }


  constructor(private bookService: BooksService, private buyService: BuyService) { }

  ngOnInit() {
    this.getBooks();
  }

}
