import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStripeModule } from 'ngx-stripe';

import { TodoComponent } from './todo.component';
import { HeaderComponent } from './header/header.component';
import { TodoRoutingModule } from './todo-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DesignsComponent } from './designs/designs.component';
import { PaymentsComponent } from './payments/payments.component';
import { AuthGuard } from '../gaurds/auth.guard';
import { LoginGuard } from '../gaurds/login.guard';
import { PreviousRouteService } from './services/previous-route.service';
import { LocalStorageService } from './services/local-storage.service';
import { DataService } from './services/data.service';



@NgModule({
  declarations: [
    TodoComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    ContactComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DesignsComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TodoRoutingModule,
    NgxStripeModule.forRoot('pk_test_51HCTVODRvwdogakBU0S2u8ZEnu3dYWNItOBCDyosIa3Yo07TPg2YfOYkKfMDRVOKEZgc0uqTBr3ct9nOX8yyF9wq00B7dMh6YN'),
  ],
  providers:[
    AuthGuard,
    LoginGuard,
    PreviousRouteService,
    LocalStorageService,
    DataService
  ]
})
export class TodoModule { }
