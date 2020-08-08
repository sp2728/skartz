import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DesignsComponent } from './designs/designs.component';
import { PaymentsComponent } from './payments/payments.component';
import { TodoComponent } from './todo.component';
import { AuthGuard } from '../gaurds/auth.guard';
import { LoginGuard } from '../gaurds/login.guard';

const routes:Routes = [
    {path:"", component:TodoComponent, 

    children:[
        {
            path:"", component:DashboardComponent
        },
        {
            path:"profile", component:ProfileComponent, canActivate:[AuthGuard]
        },
        {
            path:"login", component:LoginComponent, canActivate:[LoginGuard]
        },
        {
            path:"signup", component:SignupComponent, canActivate:[LoginGuard]
        },
        {
            path:"forgotPassword", component:ForgotPasswordComponent
        },
        {
            path:"resetPassword/:username", component:ResetPasswordComponent
        },
        {
            path:"contact", component:ContactComponent
        },
        {
            path:"designs", component:DesignsComponent
        },
        {
            path:"payments", component:PaymentsComponent, canActivate:[AuthGuard]
        }
    ]}

]

@NgModule({
    declarations: [],
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class TodoRoutingModule { }