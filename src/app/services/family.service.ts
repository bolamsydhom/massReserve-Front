import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from '../_model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FamilyService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  addMember(member) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token
    });
    // console.log(headers);

    return this.http.post(`${this.url}member/add`, member, {headers});
  }


  getMembersByUser(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(`${this.url}member/byUser/${localStorage.getItem('userId')}`, { headers });
  }

}
