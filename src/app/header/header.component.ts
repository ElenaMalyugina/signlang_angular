import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  env=environment.baseApiUrl;
  userData = {
    login: null, 
    photo: null   
  }

  photo: string;

  isShowDrop: boolean= false; 

  toggleDrop(){
    this.isShowDrop = !this.isShowDrop;
  }

  logout(){
    this.loginService.logout();
    this.isShowDrop = false;
  }

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    try{
      this.userData.login = JSON.parse(localStorage.getItem('userData')).login;
      this.userData.photo = JSON.parse(localStorage.getItem('userData')).photo;
    }
    catch(e){}
    
    this.loginService.userData.subscribe(userData=> {
      this.userData = userData
    });   

    document.addEventListener('click', (e)=>{
      const el = <HTMLElement>e.target;
      
      if(!el.classList.contains('js-drop')){
        this.isShowDrop = false;
      }
    })
  }
  

}
