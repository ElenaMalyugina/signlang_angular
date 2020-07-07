import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { FileService } from '../services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ImgService } from '../services/img.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  book: Book = new Book({});
  file: File;
  fileTypeError: boolean = false;
  pictureProfileUrl: string = `${environment.baseApiUrl}/uploads/covers/`;
  tempPictureUrl: string | ArrayBuffer;
  isImgPath: boolean = true;
  
  getBookData(id: string){
    this.booksService.getBook(id).subscribe(
      book=>{
        this.book = new Book(book);
      })
  }

  addCover(e){
    this.book.picture = e.target.files[0].name;
    this.file=e.target.files[0];

    if(this.file.type.match('image.*') ){
      console.log("это картинка");
      this.fileTypeError = false;
      this.isImgPath = false;
      this.imgService.renderImage(this.file, this);
    }
    else{
      console.log("не картинка");
      this.fileTypeError = true;
      e.target.value = null;
      this.file = null;
    }
  }

  addBook(book){
    console.log(book);
    this.booksService.addBook(book)
      .subscribe(
        res=>{
          if(this.file){
            this.addFile(this.file, res['id']);
          }
          else{
            this.goBack();
          }         
        },
        err=>{
          console.log(err);
        }
      );
  }

  editBook(book){
    console.log(book);
   
    this.booksService.editBook(book).subscribe(
      res=>{
        if(this.file){
          this.addFile(this.file, book.id);
        }
        else{
          this.goBack();
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

  addFile(file, bookId){
    this.fileService.sendBookCover(file, bookId).subscribe(
      res=>{
        console.log(res);
        this.goBack();
      }, 
      err=>{
        console.log(err);
      }
    );    
  }

  goBack(){
    this.router.navigate(['/books']);
  }

  constructor(
    private booksService: BooksService, 
    private fileService: FileService, 
    private router: Router, 
    private route: ActivatedRoute,
    private imgService: ImgService) { }

  ngOnInit() {
    let bookId = this.route.snapshot.paramMap.get('bookId');

    if(bookId){
      this.getBookData(bookId);
    }
  }

}
