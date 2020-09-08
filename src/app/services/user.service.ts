import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { browser } from 'protractor';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  iceId;
  verficationNumber;
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  modalClosed = false;
  modal = new BehaviorSubject<boolean>(this.modalClosed);

  register(user: UserModel) {
    console.log(user);
    return this.http.post(`${this.url}user/register`, user);
  }


  Login(user) {
    return this.http.post(`${this.url}user/login`, user);
  }

  imageUpload(img) {
    const formData = new FormData();
    formData.append('photo', img);
    return this.http.post(`${this.url}user/upload-image`, formData);
  }

  generateCode(number) {
    const phoneNumber = {
      phone: `+20${number}`
    };
    return this.http.post(`${this.url}user/generateCode`, phoneNumber);
  }

  verifyCode(id, token) {
    console.log('in verify code');
    const data = {
      id,
      token
    };
    return this.http.post(`${this.url}user/verifyCode`, data);
  }

isAuthendicated(){
  console.log(localStorage.getItem('token') != null );

  return localStorage.getItem('token') != null;


}

}

