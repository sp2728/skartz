import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.css']
})
export class DesignsComponent implements OnInit {

  tog:boolean;
  num:any;
  profileClass:any;
  loginClass:any;
  signupClass:any;
  isPrevious:any;
  isNext:any;

  constructor(private navbarService:NavbarService) { }

  ngOnInit() {
    this.tog=false;
    this.num=0;
    this.isPrevious=true;
    this.isNext=false;
    this.profileClass= document.querySelector('#profileContent');
    this.loginClass= document.querySelector('#loginContent');
    this.signupClass= document.querySelector('#signupContent');
    this.navbarService.show();
  }

  prev(){
    if(this.num==1){
      this.loginClass.classList.remove('contentActive');
      this.profileClass.classList.add('contentActive');
      this.isPrevious=true;
    }
    if(this.num==2){
      this.loginClass.classList.add('contentActive');
      this.signupClass.classList.remove('contentActive');
      this.isNext=false;
    }
    this.num--;
  }

  next(){
    if(this.num==0){
      this.profileClass.classList.remove('contentActive');
      this.loginClass.classList.add('contentActive');
      this.isPrevious=false;

    }
    if(this.num==1){
      this.loginClass.classList.remove('contentActive');
      this.signupClass.classList.add('contentActive');
      this.isNext=true;
    }
    this.num++;
  }

}
