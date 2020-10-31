import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MassService } from 'src/app/services/mass.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FamilyService } from './../../services/family.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-choose-mass',
  templateUrl: './choose-mass.component.html',
  styleUrls: ['./choose-mass.component.scss'],
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
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(300),
      ]),
    ]),
    trigger('transState', [
      state('normal', style({})),
      state(
        'moved',
        style({
          opacity: 1,
          transform: 'translateX(0px) scale(1)',
        })
      ),
      transition('normal <=> moved', [
        style({ opacity: 0, transform: 'scale(0.2)' }),
        animate(900),
      ]),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(500),
      ]),
    ]),
    trigger('divState2', [
      state(
        'moved',
        style({
          opacity: '1',
          transform: 'translateY(0px)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(500),
      ]),
    ]),
    trigger('divState3', [
      state(
        'moved',
        style({
          opacity: '1',
          transform: 'translateY(0px)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(900),
      ]),
    ]),
    trigger('floatRight', [
      state(
        'moved',
        style({
          opacity: '1',
          transform: 'translateX(0px)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate(500),
      ]),
    ]),
    trigger('floatLeft', [
      state(
        'moved',
        style({
          opacity: '1',
          transform: 'translateX(0px)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(500),
      ]),
    ]),
  ],
})
export class ChooseMassComponent implements OnInit {
  selectedFamilyMembers = new FormControl();
  state = 'normal';
  familyMembers;
  masses;
  churches;
  daySelected;
  selectedMass;
  selectedChurch;
  showLoading = false;
  massTimes = ['6:00 AM', '8:00 AM'];
  constructor(
    private massService: MassService,
    private familyService: FamilyService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showLoading = true;
    this.massService.getAllMasses().subscribe(
      (data) => {
        this.masses = data;
        this.showLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.massService.getAllChurches().subscribe(
    //   (data)=>{this.churches = data; console.log(this.churches);
    //   },
    //   (err)=>{console.log(err);
    //   }
    // )
    // this.familyService.getMembersByUser().subscribe(
    //   (data) => {
    //     this.familyMembers = data;
    //     console.log(this.familyMembers);

    //   },
    //   (error) => console.log(error)
    // );
  }

  onTimeChange() {}
  onChangeMembers() {
    this.masses = this.masses.filter(
      (m) => m.remainingCapacity > this.selectedFamilyMembers.value.length
    );
    console.log(this.selectedFamilyMembers.value);
  }

  onMassClicked(m) {
    if (!this.selectedMass) {
      setTimeout(() => {
        this.state = 'moved';
      }, 100);
    }
    console.log(m);
    console.log(this.selectedMass);
    this.selectedMass = m;
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.daySelected = event.value;
  }
  onSubmit(id) {
    console.log(id);
    this.showLoading = true;
        this.massService.reserveAMass(id).subscribe(
          (response) => {
            this.showLoading = true;
            setTimeout(() => {
              this.router.navigate(['/confirmation']);
            }, 1000);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      // (err) => {
      //   this._snackBar.open('لا يمكن الحجز اكثر من مرة .. شكرا لتفهمك', '♥️', {
      //     duration: 6000,
      //   });
      //   setTimeout(() => {
      //     this.router.navigate(['/']);

      //   }, 7000);
      // }



  onlyOdds = (d): boolean => {
    const date = d.getDay();
    // Even dates are disabled.
    if (date == 5) {
      return true;
    }
    // return date % 2 == 0;
  };
}
