import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/userProfile.service';
import { UserData } from '../models/userData.model';
import { environment } from 'src/environments/environment';
import { FileService } from '../services/file.service';
import { LoginService } from '../login/login.service';
import { ImgService } from '../services/img.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: UserData = new UserData({});
  pictureProfileUrl: string = `${environment.baseApiUrl}/uploads/userphoto/`;
  file: File;
  fileTypeError: boolean = false;
  isPhotoSectionOpen: boolean = false;
  isPasswordSectionOpen: boolean = false;
  tempPictureUrl: string | ArrayBuffer;
  isImagePath: boolean = true;

  passFormData = {
    oldPassword: null,
    newPassword: null   
  }

  togglePhotoSection(){
    this.isPhotoSectionOpen = !this.isPhotoSectionOpen;
  }

  togglePasswordSection(){
    this.isPasswordSectionOpen = !this.isPasswordSectionOpen;
  }

  getUserData(userId){
    this.userProfileService.getUserData(userId).subscribe(res=>{
      this.userData = new UserData(res);      
    })
  }

  changeUserData(userData){
    this.userProfileService.changeUserData(userData).subscribe(res=>{
      this.userData = new UserData(res);
      this.sendNewPhoto(this.file);
    })
  }

  changePhoto(e){
    this.userData.photo = null;
    this.file=e.target.files[0];
    
    if(this.file.type.match('image.*') ){
      console.log("это картинка");
      this.fileTypeError = false;
      this.imgService.renderImage(this.file, this);
    }
    else{
      console.log("не картинка");
      this.fileTypeError = true;
      e.target.value = null;
      this.file = null;
      return
    }
  }

  sendNewPhoto(file){
    if(file){
      this.fileService.sendUserPhoto(file, this.userData.userId)
        .subscribe(res=>{    
          this.userData.photo = res['fileName'];      
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.loginService.userData.next(this.userData);
        },
        err=> console.log(err)
      )
    }
  }

  changePassword(passFormData){
    console.log(passFormData);
    passFormData.login = this.userData.login;
    this.userProfileService.changePassword(passFormData).subscribe(
      res=>{
        if(res['res']!="BAD"){
          this.loginService.logout()
        }
        
      },
      err=>{
        console.log(err);
      }
    )

  }

  constructor(
    private userProfileService: UserProfileService, 
    private fileService: FileService, 
    private loginService: LoginService,
    private imgService: ImgService
  ) { }

  ngOnInit() {
    try{
       this.userData = new UserData(JSON.parse(localStorage.getItem('userData'))); 
    }
    catch(e){
      console.log(e);
    }

    this.getUserData(this.userData.userId);

  }

}
