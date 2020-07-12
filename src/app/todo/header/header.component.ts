import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:any;
  user:any;

  constructor(private dataService:DataService, private localStorageService:LocalStorageService, private router:Router) { }

  ngOnInit() {
    this.username = this.localStorageService.getUser();
    this.getProfile();
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
    })
  }
}
