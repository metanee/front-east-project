import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Appconst } from '../../../constants/app-const';
@Injectable({
  providedIn: 'root'
})
export class CrurrentService {
  private serverPath: string = Appconst.serverPath;

  constructor(
    private http: Http
  ) { }


  getCurrentCompany() {
    let url = this.serverPath+'/company/getCurrentCompany';

    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers : tokenHeader});
  }

  getCurrentUser() {
    let url = this.serverPath+'/user/getCurrentUser';

    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers : tokenHeader});
  }
}
