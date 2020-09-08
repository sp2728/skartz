import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { DataService } from '../services/data.service';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginData: any;
  submitted: any;
  error: any;
  loading: any;

  constructor(private fb: FormBuilder, private router: Router, private socialAuthService: AuthService, private navbarService:NavbarService, private localStorageService: LocalStorageService, private dataService: DataService) { }

  ngOnInit() {
    this.createForm();
    this.submitted = false;
    this.loading = false;
    this.navbarService.hide();
    this.socialAuthService.signOut();

  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user)=>{
      this.dataService.postSocialLogin({username:user.name, email:user.email, profileImage:user.photoUrl, googleId:user.id}).subscribe((res)=>{
        if(res['success']){
          this.localStorageService.setUser(user['name']);
          this.router.navigate(['/'])
        }
        else{
          console.log('Error login in with google');
        }
      })

    })
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user)=>{
      this.dataService.postSocialLogin({username:user.name, email:user.email, profileImage:user.photoUrl, facebookId:user.id}).subscribe((res)=>{
        if(res['success']){
          this.localStorageService.setUser(user['name']);
          this.router.navigate(['/'])
        }
        else{
          console.log('Error login in with Facebook');
        }
      })
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginData = this.loginForm.value;
      this.submitted = false;
      this.dataService.postLogin(this.loginData).subscribe((res) => {
        if (res['success']) {
          this.localStorageService.setUser(this.loginData['username']);
          this.router.navigate(['/'])
        }
        else {
          this.error = "Invalid username or password";
          this.loginForm.reset()
        }
        this.loading = false;
      })
    }
  }

}
