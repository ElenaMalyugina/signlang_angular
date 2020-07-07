import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { environment } from 'src/environments/environment';
import { ChaptersService } from '../services/chapters.service';
import { Chapter } from '../models/chapter.model';
import { LessonPartService } from '../services/lesson-part.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.scss']
})
export class BookviewComponent implements OnInit {
  book: Book = new Book({});
  chapter: any = null;
  bookId:string = "";
  chapterId: string = '';
  pictureUrl=environment.baseApiUrl;  
  lessonParts = []; 

  stepActive: number = 0; 

  getBook(bookId:string){
    this.booksService.getBook(bookId).subscribe(
      res=> this.book =new Book(res)
    )
  }

  getChapter(chapterId){
    this.chaptersService.getChapter(chapterId).subscribe(
      res=> this.chapter = new Chapter(res)
    );
  }  

  getLessonParts(chapterId){
    this.lessonPartService.getLessonParts(chapterId).subscribe(resp=>{
      console.log(resp);
      this.lessonParts = <any[]>resp;
    })
  }

  changeStepActive(stepNum: number){
    this.stepActive = stepNum
  }

  constructor(private route: ActivatedRoute, private booksService: BooksService, private chaptersService: ChaptersService, private lessonPartService: LessonPartService) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId'); 
    this.chapterId = this.route.snapshot.paramMap.get('chapterId');   
    
    this.getBook(this.bookId);
    this.getChapter(this.chapterId);
    this.getLessonParts(this.chapterId);
  }

}
