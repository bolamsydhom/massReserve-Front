import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstStepComponent } from './first-step/first-step.component';
import { FamilyService } from '../services/family.service';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChooseMassComponent } from './choose-mass/choose-mass.component';
import { MassService } from '../services/mass.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FatherService } from '../services/father.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [FirstStepComponent, ChooseMassComponent, ConfirmationComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule

  ],
  exports: [],
  providers: [FamilyService, MassService, FatherService]
})
export class UserModule { }
