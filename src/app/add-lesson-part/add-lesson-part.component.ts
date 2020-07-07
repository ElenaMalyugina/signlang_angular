import { Component, OnInit } from '@angular/core';
//import { Chapter } from '../models/chapter.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
//import { ChaptersService } from '../services/chapters.service';
import { FileService } from '../services/file.service';
import { LessonPartService } from '../services/lesson-part.service';
import { LessonPart } from '../models/lessonPart.model';
//import { environment } from 'src/environments/environment';
import { UploadAdapter } from '../services/uploadAdapter';
import { EditorConfig } from '../configs/editorConfig';

@Component({
  selector: 'app-add-lesson-part',
  templateUrl: './add-lesson-part.component.html',
  styleUrls: ['./add-lesson-part.component.scss']
})
export class AddLessonPartComponent implements OnInit {

  chapterPart: LessonPart = new LessonPart({});

  bookId: string = '';
  bookName: string ='';
    
  video: File;
  public Editor = ClassicEditor;
  
  config = EditorConfig;
  videoUrl: string = '';
  fileTypeError: boolean = false;
  defaultStepsArray = Array(10);

  getlessonPart(lessonPartId){
    this.lessonPartService.getLessonPart(lessonPartId).subscribe(res=>{
      this.chapterPart = new LessonPart(res);
    })
  }

  addVideo(e){
    this.video =e.target.files[0];

    if(this.video.type.match('video.*') ){
      console.log("видео");
      this.fileTypeError = false;
    }
    else{
      console.log("не видео");
      this.fileTypeError = true;
      e.target.value = null;
      this.video = null;
      return;
    }

    if(this.video){
      this.fileService.sendVideo(this.video).subscribe(res =>{
        this.videoUrl = res['fileName'];
      })
    }    
  } 

  addLessonPart(lessonPart){
    console.log(lessonPart);
    this.lessonPartService.addLessonPart(lessonPart).subscribe(
      resp=>{
        this.router.navigate(['/book', this.bookId, 'chapter', this.chapterPart.chapterId]);
      },
      err=>{
        console.log(err);
      }
    )
  }

  editLessonPart(lessonPart){
    this.lessonPartService.editLessonPart(lessonPart).subscribe(
      resp=>{
        this.router.navigate(['/book', this.bookId, 'chapter', this.chapterPart.chapterId]);
      },
      err=>{
        console.log(err);
      }
    )
  }

  deleteFile(){
    const videoInput = document.getElementById('video');
    videoInput['value'] = null;
    this.video = null;
    this.videoUrl = "";
    //TODO: удалить файл с сервера
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  constructor(
    private route: ActivatedRoute, 
    private booksService: BooksService, 
    private lessonPartService: LessonPartService, 
    private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.chapterPart.chapterId = this.route.snapshot.paramMap.get('chapterId');
    this.chapterPart.id = this.route.snapshot.paramMap.get('lessonId');

    if(this.chapterPart.id){
      this.getlessonPart(this.chapterPart.id);
    }
    
    this.booksService.getBookName(this.bookId).subscribe(res=> {
      this.bookName = res['name'];
    })
  }

}


