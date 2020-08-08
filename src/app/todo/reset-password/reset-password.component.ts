import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  resetData: any;
  submitted:any;
  loading:any;
  confirmPasswordError= false;
  confirmPasswordErrorValue:any;
  username:any;

  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private dataService:DataService, private router:Router) { }

  ngOnInit() {
    this.createForm();
    this.submitted = false;
    this.loading=false;
    this.activatedRouter.params.subscribe(params => {
      this.username = params.username;
      console.log(this.username);
      })
  }

  createForm() {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required]]
    })
  }

  checkPasswordConfirmation(password:any, confirmPassword:any){
    if(!confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password is required";
      return false;
    }
    else if(this.resetData['newPassword']!== confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password should match with Password";
      return false;
    }
    else{
      this.confirmPasswordError=false;
      return true;
    }
  }

  onSubmit() {
    this.submitted = true;

    this.resetData = this.resetForm.value;
    let confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value
    let passwordCheck= this.checkPasswordConfirmation(this.resetData['newPassword'],confirmPassword)

    if (this.resetForm.valid && passwordCheck) {
      this.loading = true;
      this.submitted = false;
      this.dataService.resetPassword(this.resetData, this.username).subscribe((res)=>{
        if (res['success']) {
          this.router.navigate(['/login'])
        }
      })
    }

  }
}
