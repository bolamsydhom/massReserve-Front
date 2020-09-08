import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  animations: [
    trigger('divState', [
      state('moved', style({
        opacity: '1',
        transform: 'translateY(0px)'
      })),
      transition('void => *', [style({ opacity: 0, transform: 'translateY(50px)' }), animate(900)])

    ])

  ]
})
export class ConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
