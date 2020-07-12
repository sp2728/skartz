import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes:Routes = [
  {
    path:"", component:DashboardComponent, 
},
{
    path:"profile", component:ProfileComponent, 
},
{
    path:"login", component:LoginComponent
},
{
    path:"signup", component:SignupComponent
}
]

@NgModule({
    declarations: [],
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class TodoRoutingModule { }