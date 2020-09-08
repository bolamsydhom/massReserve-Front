import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserService } from '../services/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    // CommonModule,
    SpinnerComponent
  ],
  providers: [UserService, HttpClientModule, HttpClient],
})
export class SharedModule { }
