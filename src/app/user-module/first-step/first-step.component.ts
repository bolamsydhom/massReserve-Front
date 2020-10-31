import { Component, OnInit } from '@angular/core';
import { FamilyService } from './../../services/family.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FatherService } from './../../services/father.service';
import { ThrowStmt } from '@angular/compiler';
import { MassService } from 'src/app/services/mass.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  animations: [
    trigger('divState', [
      state(
        'moved',
        style({
          opacity: '1',
          transform: 'translateY(0px)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate(900),
      ]),
    ]),
  ],
})
export class FirstStepComponent implements OnInit {
  spinnerEnabled = false;
  prayers = [];
  familyMemberNumber: number = 0;
  selected;
  savedPersons = 0;
  saved = false;
  err = false;
  family;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  alreadyExist = true;
  constructor(
    private _formBuilder: FormBuilder,
    private massService: MassService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  familyMemberNumberChanged() {
    this.family = Array(this.familyMemberNumber);
    // console.log(this.family);
  }

  onSubmit(f) {
    this.err = false;
    this.savedPersons++;
    const exist = this.massService.prayers.find(
      (m) => m.idNumber === f.value.idNumber
    );
    if (exist) {
      this.savedPersons++;
      this.alreadyExist = true;
      this._snackBar.open('من فضلك ادخل رقم قومي مختلف', '♥️', {
        duration: 5000,
      });
    } else {
      this.massService.checkRepeat(f.value.idNumber).subscribe(
        () => {
          this.alreadyExist = false;
          this.massService.addPrayer({ ...f.value });
          this.massService.familyMemberNumber = this.familyMemberNumber;
        },
        (err) => {
          this.savedPersons--;
          this.alreadyExist = true;
          console.log(err);
          err.status == 405
            ? this._snackBar.open(
                'لا يمكن الحجز اكثر من مرة .. شكرا لتفهمك',
                '♥️',
                {
                  duration: 6000,
                }
              )
            : (this.err = true);
        }
      );
    }
  }
}
