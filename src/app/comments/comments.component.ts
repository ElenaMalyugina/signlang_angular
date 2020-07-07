import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentService } from '../services/comment.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommentsEditorConfig } from '../configs/conmmetsEditorConfig';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any=[];
  newCommment= '';
  userId = '';

  @Input() entityId: string;
  pictureUrl=environment.baseApiUrl;  

  public Editor = ClassicEditor;
  
  config = CommentsEditorConfig;

  getComments(entityId){
    this.commentService.getComments(entityId).subscribe(resp=>{
      this.comments = resp;
    })

  }

  addComment(){
    /*this.comments.push({
      text: this.newCommment,
      author: this.userData.login,
      avatar: this.userData.photo
    })*/
    const comment = {
      entityId: this.entityId,
      commentText: this.newCommment,
      authorId: this.userId
    }

    this.commentService.addComment(comment).subscribe(
      resp=>this.getComments(this.entityId)
    );

    this.newCommment= '';
  }

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    try{
      this.userId = JSON.parse(localStorage.getItem('userData'))['userId'];      
    }
    catch(e){}

    this.getComments(this.entityId);
  }

}
