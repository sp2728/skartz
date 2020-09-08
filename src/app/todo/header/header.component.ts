import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:any;
  user:any;

  constructor(private dataService:DataService,private socialAuthService:AuthService, private localStorageService:LocalStorageService, private router:Router) { }

  ngOnInit() {
    this.username = this.localStorageService.getUser();
    this.getProfile()

  }

  toggleNav(){
    document.querySelector('.nav-links').classList.toggle('nav-active');
    document.querySelector('.bars').classList.toggle('toggleBars');
  }

  getProfile(){
    this.dataService.getProfile().subscribe((res)=>{
      if(res['success']){
        this.user = res['user'];
      }
    })
  }

  logout() {
    this.dataService.getLogout().subscribe((res) => {
      if (res['success']) {
        this.localStorageService.clearAll();
        console.log('Successfully logged out');
        this.router.navigate(['/login']);
      }
    });
    this.socialAuthService.signOut();
  }
}
