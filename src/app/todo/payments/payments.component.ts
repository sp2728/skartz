import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { DataService } from '../services/data.service';
 
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  paymentStatus:any;
  stripeData:any;
  submitted:any;
  loading:any;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  stripeForm: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private dataService:DataService) { }

  ngOnInit() {
    this.loading = false;
    this.createForm();

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        if (!this.card) {
          this.card = this.elements.create('card', {
            iconStyle: 'solid',
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            },
          });
          this.card.mount('#card-element');
        }
      });
  }

  createForm(){
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  buy() {
    this.submitted = true;
    this.loading = true;
    this.stripeData = this.stripeForm.value
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.stripeData['token']=result.token
          this.dataService.stripePayment(this.stripeData).subscribe((res)=>{
            if(res['success']){
              this.loading = false;
              this.submitted = false;
              this.paymentStatus = res['status'];
            }
            else{
              this.loading = false;
              this.submitted = false;
              this.paymentStatus = res['status'];
            }
          })
        } else if (result.error) {
          this.paymentStatus = result.error.message
        }
      });
  }

}
