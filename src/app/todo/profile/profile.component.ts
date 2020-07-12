import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  choosen:any;
  image:any;
  submitted=false;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getProfile();
    this.choosen=false;
  }

  getProfile(){
    this.dataService.getProfile().subscribe((res)=>{
      this.user = res['user'];
    })
  }

  fileChoosen(event:any){
    if(event.target.value){
      this.image = <File>event.target.files[0];
      this.choosen= true;
    }
  }

  submitPhoto(){
    let fd = new FormData();
    this.submitted= true;
    if(this.image){
      fd.append('profileImage', this.image, this.image.name);
      this.dataService.updateProfileImage(fd).subscribe((res)=>{
        if(res['success']){
          this.submitted=false;
          this.getProfile();
        }
      });
    }
  }

  deletePhoto(){
    this.dataService.deleteProfileImage().subscribe((res)=>{
      if(res['success']){this.getProfile();}
    })
  }


}
