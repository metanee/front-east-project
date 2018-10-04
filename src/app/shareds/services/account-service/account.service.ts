import { Injectable } from '@angular/core';
import { Register } from '../../model/register.model';
import { Http, Headers } from '@angular/http';
import { Login } from '../../model/login.model';

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
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    console.log(userInfo);
    return this.http.post(url, JSON.stringify(userInfo), { headers: tokenHeader });
  }

  sendCredential(model: Login) {
    let url = "http://localhost:8080/token";
    let encodedCredentials = btoa(model.username + ":" + model.password);
    let basicHeader = "Basic " + encodedCredentials;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });

    return this.http.get(url, { headers: headers });
  }

  checkSession() {
    let url = "http://localhost:8080/checkSession";
    let headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });

  }

  logout() {
    let url = "http://localhost:8080/user/logout";

    let headers = new Headers({
      'x-auth-token': localStorage.removeItem('xAuthToken')
    });

    return this.http.post(url, '', { headers: headers });

  }

}

