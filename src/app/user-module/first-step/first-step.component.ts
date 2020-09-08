import { Component, OnInit } from '@angular/core';
import { FamilyService } from './../../services/family.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FatherService } from './../../services/father.service';
import { ThrowStmt } from '@angular/compiler';
import { MassService } from 'src/app/services/mass.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  animations: [
    trigger('divState', [
      state('moved', style({
        opacity: '1',
        transform: 'translateY(0px)'
      })),
      transition('void => *', [style({ opacity: 0, transform: 'translateY(-50px)' }), animate(900)])

    ])

  ]
})
export class FirstStepComponent implements OnInit {
  spinnerEnabled = false;
  prayers= [];
  familyMemberNumber: number = 0;
  selected;
  savedPersons = 0;
  saved = false;
  err = false;
  family;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor( private _formBuilder: FormBuilder, private massService:MassService) { }

  ngOnInit(): void {


  }

  familyMemberNumberChanged() {
    this.family = Array(this.familyMemberNumber);
    // console.log(this.family);

  }

  onSubmit(f) {

    this.savedPersons++;


   this.massService.addPrayer({...f.value });


  }
}
