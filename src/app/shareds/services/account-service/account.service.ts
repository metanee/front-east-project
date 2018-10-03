import { Injectable } from '@angular/core';
import { Register } from '../../model/register.model';
import {Http, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: Http
  ) { }

   // ลงทะเบียน
   onRegister(model: Register) {
    let url = "http://localhost:8080/user/newUser";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    console.log(userInfo);
    return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
  }

}

