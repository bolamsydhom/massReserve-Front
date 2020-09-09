import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from '../_model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MassService {
  prayers = [];
  constructor(private http: HttpClient) { }
  url = 'https://friday-mass.herokuapp.com/';

  addPrayer(prayer){
    this.prayers.push(prayer);
    // console.log(this.prayers);


  }

  getAllMasses() {
    return this.http.get(`${this.url}mass/capacity/${this.prayers.length}`);
  }

  getAllChurches(){
    return this.http.get(`${this.url}church`);

  }

  reserveAMass(id){
    const body = {id: id, prayers: this.prayers}
    return this.http.patch(`${this.url}mass/patch`, body);
  }

  isAuthendicated(){
    return this.prayers?.length > 0;
  
  
  }
}
