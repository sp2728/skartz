import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { RouterModule } from '@angular/router';
import { HttpConfigInterceptorProvider } from './interceptor/httpconfig.interceptor';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { provideConfig } from './interceptor/socialLoginConfig';
 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TodoModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    NgxStripeModule.forRoot('pk_test_51HCTVODRvwdogakBU0S2u8ZEnu3dYWNItOBCDyosIa3Yo07TPg2YfOYkKfMDRVOKEZgc0uqTBr3ct9nOX8yyF9wq00B7dMh6YN'),
  ],
  providers: [
    HttpConfigInterceptorProvider,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
