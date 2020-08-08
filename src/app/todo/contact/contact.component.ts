import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform', { static: false }) todoFormDirective;
  contactForm: FormGroup;
  contactData: any;
  submitted: any;
  loading: any;

  constructor(private fb: FormBuilder, private dataService: DataService, private navbarService:NavbarService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.loading = false;
    this.navbarService.show();
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.contactForm.valid) {
      this.contactData = this.contactForm.value;
      this.dataService.postcontact(this.contactData).subscribe((res) => {
        if (res['success']) {
          console.log(res)
          this.loading = false;
          this.submitted = false;
          this.contactForm.reset()
        }
      })
    }
  }

}
