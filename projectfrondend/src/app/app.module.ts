import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewpageComponent } from './viewpage/viewpage.component';
@NgModule({
  declarations: [
    AppComponent,
   
    RegisterComponent,
    ViewpageComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,

  

 
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
