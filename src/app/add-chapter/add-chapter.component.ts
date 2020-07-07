import { Component, OnInit } from '@angular/core';
import { Chapter } from '../models/chapter.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { ChaptersService } from '../services/chapters.service';
import { FileService } from '../services/file.service';
import { environment } from 'src/environments/environment';
import { ImgService } from '../services/img.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {
  chapter: Chapter = new Chapter({});
  bookName: string ='';
  cover: File;  
  fileTypeError: boolean = false;
  pictureProfileUrl: string = `${environment.baseApiUrl}/uploads/chapterCovers/`;
  tempPictureUrl: string | ArrayBuffer;
  isImagePath: boolean = true;

  getChapterData(chapterId){
    this.chaptersService.getChapter(chapterId).subscribe(
      chapter=>{
        this.chapter = new Chapter(chapter);
      })
  }

  addCover(e){
    this.chapter.cover = e.target.files[0].name;
    this.cover=e.target.files[0];

    if(this.cover.type.match('image.*') ){
      console.log("это картинка");
      this.fileTypeError = false;
      this.isImagePath = false;
      this.imgService.renderImage(this.cover, this);
    }
    else{
      console.log("не картинка");
      this.fileTypeError = true;
      e.target.value = null;
      this.cover = null;
    }
  }

  goBack(){
    this.router.navigate(['/book', this.chapter.bookId]);
  }
  
  addChapter(chapter){
    this.chaptersService.addChapter(chapter).subscribe(
      res=> {
        if(this.cover){
          this.sendCover(this.cover, res['id']);
        }
        else{
          this.goBack();
        }
      }
    )
  }

  editChapter(chapter){
    this.chaptersService.editChapter(chapter).subscribe(res=>{
      if(this.cover){
       this.sendCover(this.cover, this.chapter.id);
      }
      else{
        this.goBack();
      }
    })
  }

  sendCover(cover, id){
    this.fileService.sendChapterCover(cover, id).subscribe(res=>{
      console.log("Обложка загружена");
      this.goBack();
    })
  }

  constructor(
    private route: ActivatedRoute, 
    private booksService: BooksService, 
    private chaptersService: ChaptersService, 
    private fileService: FileService, 
    private router: Router,
    private imgService: ImgService) { }

  ngOnInit() {
    this.chapter.bookId = this.route.snapshot.paramMap.get('bookId');
    
    this.booksService.getBookName(this.chapter.bookId).subscribe(res=> {
      this.bookName = res['name'];
    });

    this.chapter.id = this.route.snapshot.paramMap.get('chapterId');

    if(this.chapter.id){
      this.getChapterData(this.chapter.id);
    }

  }

}
