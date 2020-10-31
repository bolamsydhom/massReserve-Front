import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from '../_model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MassService {
  prayers = [];
  ids = [];
  familyMemberNumber = 0;
  constructor(private http: HttpClient) { }
  url = 'https://friday-mass.herokuapp.com/';
  // url = 'http://localhost:3000/';

  addPrayer(prayer){
    this.ids.push(prayer.idNumber);
    this.prayers.push(prayer);
    // console.log(this.prayers);


  }

  getAllMasses() {
    return this.http.get(`${this.url}mass/capacity/${this.prayers.length}`);
  }

  getAllChurches(){
    return this.http.get(`${this.url}church`);

  }

  checkRepeat(id){

    const body = {id: id};

    return this.http.post(`${this.url}id/add`, body);

  }

  reserveAMass(id){
    const body = {id: id, prayers: this.prayers};
    return this.http.patch(`${this.url}mass/patch`, body);
  }

  isAuthendicated(){
    return this.prayers?.length > 0;


  }
}
