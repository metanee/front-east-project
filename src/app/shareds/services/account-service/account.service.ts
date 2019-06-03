import { Injectable } from '@angular/core';
import { Register } from '../../model/register.model';
import { Http, Headers } from '@angular/http';
import { Login } from '../../model/login.model';
import { User } from '../../model/user.model';
import { Appconst } from '../../../constants/app-const';
import { ChangPassword } from '../../model/changpassword.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private serverPath: string = Appconst.serverPath;

  constructor(
    private http: Http
  ) { }

  onChangePassword(model: ChangPassword){
    let url = this.serverPath + "/user/passwordUserInfo";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    console.log(userInfo);
    return this.http.post(url, JSON.stringify(userInfo), {headers:tokenHeader});
  }

  onChangePasswordOwner(model: ChangPassword){
    let url = this.serverPath + "/company/passwordCompanyInfo";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    console.log(userInfo);
    return this.http.post(url, JSON.stringify(userInfo), {headers:tokenHeader});
  }

    // แก้ไขข้อมูลส่วนตัว
  updateUserInfo(model: User) {
    let url = this.serverPath + "/user/updateUserInfo";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, JSON.stringify(userInfo), { headers: tokenHeader });
  }

  //ลืมรหัสผ่าน
  retrievePassword(email:string) {
  	let url = this.serverPath+ "/user/forgetPassword";
  	let userInfo = {
  		"email" : email
  	}
  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('xAuthToken')
  	});

  	return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
  }

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
  // เข้าสู่ระบบ
  sendCredential(model: Login) {
    let url = "http://localhost:8080/token";
    let encodedCredentials = btoa(model.username.toLowerCase() + ":" + model.password);
    let basicHeader = "Basic " + encodedCredentials;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });

    return this.http.get(url, { headers: headers });
  }

  // ตรวจสอบเซคชั่น
  checkSession() {
    let url = "http://localhost:8080/checkSession";
    let headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });

  }
  // ออกจากระบบ
  logout() {
    let url = "http://localhost:8080/user/logout";

    let headers = new Headers({
      'x-auth-token': localStorage.removeItem('xAuthToken')
    });

    return this.http.post(url, '', { headers: headers });

  }

}

