import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { RouterModule } from '@angular/router';
import { HttpConfigInterceptorProvider } from './interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpConfigInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
