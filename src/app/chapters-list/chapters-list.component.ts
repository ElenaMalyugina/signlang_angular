import { Component, OnInit } from '@angular/core';
import { book } from '../books.mock';
import { Chapter } from '../models/chapter.model';
import { ChaptersService } from '../services/chapters.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent implements OnInit {
  chapters: Chapter[] =  [];
  bookId: string = '';
  bookName: string ='';
  pictureUrl=environment.baseApiUrl;  

  getBookName(bookId){
    this.booksService.getBookName(bookId).subscribe(res=>{
      this.bookName = res['name'];
    })
  }

  getChapters(bookId){
    this.chaptersService.getChapters(bookId).subscribe(res=>{
      if(Array.isArray(res)){
        res.forEach(chapter=>{
          this.chapters.push(new Chapter(chapter))
        })
      }      
    })
  }

  constructor(private chaptersService: ChaptersService, private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookId=this.route.snapshot.paramMap.get('bookId');
    this.getChapters(this.bookId);
    this.getBookName(this.bookId);

  }

}
