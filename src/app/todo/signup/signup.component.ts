import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupData: any;
  submitted: any;
  error:any;
  loading:any;
  confirmPasswordError= false;
  confirmPasswordErrorValue:any;
  agreementError = false;
  isVerification:any;

  constructor(private fb: FormBuilder,private navbarService:NavbarService, private dataService:DataService, private router:Router) { }

  ngOnInit() {
    this.createForm();
    this.submitted=false;
    this.loading=false;
    this.isVerification=false;
    this.navbarService.hide();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  checkPasswordConfirmation(password:any, confirmPassword:any){
    if(!confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password is required";
      return false;
    }
    else if(this.signupData['password']!== confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password should match with Password";
      return false;
    }
    else{
      this.confirmPasswordError=false;
      return true;
    }
  }

  onSubmit(){
    this.submitted=true;
    this.error=""
    //Agreement confirmation
    this.agreementError=false;
    let agreement  = (document.getElementById('agreement') as HTMLInputElement).checked
    if(!agreement){
      this.agreementError= true;
    }

    //Password Confirmation
    this.signupData = this.signupForm.value;
    let confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value
    let passwordCheck= this.checkPasswordConfirmation(this.signupData['password'],confirmPassword)

    //Submitting the form
    if(this.signupForm.valid && passwordCheck && agreement){
      this.loading =true;
        this.dataService.verifyEmail(this.signupData).subscribe((res)=>{
          if(res['success']){
            this.isVerification=true;
            this.loading=false;
          }
          else{
            this.loading=false;
            this.error = 'Username already exists';
          }

        })  
    }
    //end
  }

  submit(code:any){
    this.signupData['code']=code;
    this.error=""
    this.loading=true;
    this.dataService.postSignup(this.signupData).subscribe((res)=>{
          if(res['success']){
            this.loading=false;
            this.router.navigate(['/']);
          }
          else{
            // if(res['err']['name']==='UserExistsError'){
            //   this.error="Username already exists";
            // }
            // else{
            //   this.error="Invalid Registration";
            // }
            // this.loading = false;
            // this.signupForm.reset()
            this.loading=false;
            this.error = res['status'];
          }
    })

  }

}
