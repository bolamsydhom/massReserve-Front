import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user-module/user.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    FormsModule,


  ],
  providers: [HttpClientModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
