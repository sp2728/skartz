import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgotForm: FormGroup;
  forgotData: any;
  submitted:any;
  error:any;

  constructor(private fb: FormBuilder, private dataService:DataService, private router:Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    this.error=""
    this.forgotData = this.forgotForm.value;
    this.dataService.forgotPassword(this.forgotData).subscribe((res)=>{
      if (res['success']) {
        this.router.navigate(['/login'])
      }
      else{
        this.error=res['status'];
      }
    })
  }

}
