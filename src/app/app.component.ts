import { Component, OnInit } from '@angular/core';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // private isRtl: boolean;
  // private _dirChangeSubscription = Subscription.EMPTY;
  constructor(dir: Directionality) {
    console.log(dir.value);
    // dir.value === 'rtl';


  }
  title = 'mass-front';
  ngOnInit() {
    AOS.init();
  }
}
