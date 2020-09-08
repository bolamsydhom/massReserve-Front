import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { FirstStepComponent } from './user-module/first-step/first-step.component';
import { ChooseMassComponent } from './user-module/choose-mass/choose-mass.component';
import { ConfirmationComponent } from './user-module/confirmation/confirmation.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '', component: FirstStepComponent },
  { path: 'mass', component: ChooseMassComponent },
  { path: 'confirm', component: ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
