import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FatherService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/father';


  getAllFathers() {
    return this.http.get(`${this.url}`);
  }


}
