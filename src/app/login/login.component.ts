import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserData } from '../models/userData.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  
  userData: UserData = new UserData({});

  isSubmitting: boolean = false;
  subscr: Subscription;

  autorize(userData: UserData){
    this.isSubmitting = true;
    this.subscr=this.loginService.login(userData).subscribe(resp=>{
      this.userData= new UserData(resp);
      this.isSubmitting = false;    
      //this.systemAlertService.setAlert('Вы успешно вошли в систему', 'success');
      this.router.navigate(['/books']);
    },
    (err)=>{
      console.log(err);
      this.isSubmitting = false;
      //this.systemAlertService.setAlert('Ошибка при входе в систему', 'danger');
    })
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(){
    localStorage.removeItem('userData');
    this.loginService.userData.next(new UserData({}));
  }

  ngOnDestroy(){
    if(this.subscr){
      this.subscr.unsubscribe();
    }
  }
    

}
