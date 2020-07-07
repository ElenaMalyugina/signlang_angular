import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserData } from '../models/userData.model';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { SystemAlertService } from '../system-alert/system-alert.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('regForm', {static: true}) regForm: NgForm;
  
  userData: UserData = new UserData({});

  isSubmitting: boolean = false;
  file:File;
  fileTypeError: boolean= false;

  registration(user: UserData){
    this.regService.registration(user)
      .subscribe(
        res=>{
          console.log(res);
          if(this.file){
            this.fileService.sendUserPhoto(this.file, res['id'])
              .subscribe(res=>{
                console.log(res)
              },
              err=> console.log(err)
            )
          }

          this.router.navigate(['/login']);
        },
        err=>{
          if(err.status==415){
            this.systemAlertService.setAlert('Такой пользователь уже существует', 'danger');            
          }      
        }
      )
  }

  addPicture(e){
    this.userData.photo = e.target.files[0].name;
    this.file=e.target.files[0];
    
    if(this.file.type.match('image.*') ){
      console.log("это картинка");
      this.fileTypeError = false;
    }
    else{
      console.log("не картинка");
      this.fileTypeError = true;
      e.target.value = null;
      this.file = null;
    }
  }

  constructor(
    private regService: RegistrationService, 
    private router: Router, 
    private systemAlertService: SystemAlertService, 
    private fileService: FileService
    ) { }

  ngOnInit() {
  }

}
