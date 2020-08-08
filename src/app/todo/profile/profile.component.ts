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
  video:any;
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

  fileChoosenVideo(event:any){
    if(event.target.value){
      this.video = <File>event.target.files[0];
      this.choosen= true;
    }
  }

  submitVideo(){
    console.log(this.video)
    let fd = new FormData();
    this.submitted= true;
    if(this.video){
      fd.append('profileVideo', this.video, this.video.name);
      this.dataService.updateProfileVideo(fd).subscribe((res)=>{
        if(res['success']){
          this.submitted=false;
          console.log('final')

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

  deleteVideo(){
    this.dataService.deleteProfileImage().subscribe((res)=>{
      if(res['success']){this.getProfile();}
    })
  }
}
