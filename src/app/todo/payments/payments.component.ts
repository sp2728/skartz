import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { DataService } from '../services/data.service';

declare var Razorpay: any;


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  razorPayData: any;
  formData: any;
  submitted: any;
  loading: any;
  selectPayment:any;
  isStripe:any;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private dataService: DataService) { }


  ngOnInit() {
    this.loading = false;
    this.createForm();
  }

  createForm() {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  createStripeCard(){
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

  selectPaymentType(event: any) {
    this.selectPayment = event.target.value;
    if(this.selectPayment=='stripe'){
      this.isStripe=true;
    }
    else{
      this.isStripe=false;
    }
    this.createStripeCard();
  }

  buy() {
    this.formData = this.paymentForm.value
    if (this.selectPayment == 'stripe') {
      this.buyStripe(this.formData);
    }
    if (this.selectPayment == 'razorPay') {
      this.buyRazorPay(this.formData);
    }
  }

  buyStripe(formData: any) {
    this.submitted = true;
    this.loading = true;
    this.stripeData = formData;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.stripeData['token'] = result.token
          this.dataService.stripePayment(this.stripeData).subscribe((res) => {
            if (res['success']) {
              this.loading = false;
              this.submitted = false;
              this.paymentStatus = res['status'];
            }
            else {
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

  razorPayOptions = {
    "key": '',
    "amount": '',
    "currency": "INR",
    "name": '',
    "description": "Skartz Payment",
    "order_id": '',
    "handler": (res) => {
      console.log(res);
    }
  };

  buyRazorPay(formData: any) {
    this.submitted = true;
    this.loading = true;
    this.razorPayData = formData
    this.dataService.razorPayOrder(this.razorPayData).subscribe((res) => {
      this.razorPayOptions.key = res['key'];
      this.razorPayOptions.amount = res['value']['amount'];
      this.razorPayOptions.name = this.razorPayData['name'];
      this.razorPayOptions.order_id = res['value']['id']
      this.razorPayOptions.handler = this.razorPayResponseHandler
      var rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open();
      console.log('opened');
    })
  }

  razorPayResponseHandler(response) {
    console.log(response);
  }

}
