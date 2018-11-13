import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //CAPITALS = constant

import { AppComponent } from './app.component';
import { routing} from './app.routing';
import { JwtInterceptor, ErrorInterceptor} from './_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true} //We inject both interceptors into HttpInterceptor[]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
