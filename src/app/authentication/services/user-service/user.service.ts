import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Appconst } from '../../../constants/app-const';
import { User, UserSearch, IUser } from '../../../shareds/model/user.model';

declare let $;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverPath: string = Appconst.serverPath;

  constructor(private http: Http) { }

  getUserbySearch(options?: User) { }

  //ดึงข้อมูล User
  getUserList(options?: UserSearch) {

    let url = this.serverPath + "/user/searchUser";
    let url2 = this.serverPath + "/user/userList";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    if (options && options.searchText && options.searchType  ) {
      return this.http.post( url, JSON.stringify(options), { headers: headers });
    }
    return this.http.get( url2, { headers: headers } );
  }
  //ดึงข้อมูล User จาก Id
  getUserbyId(id: number) {
    let url = this.serverPath +"/user/" + id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });
  }

  //ดึงข้อมูล User จาก Id
  getCommentbyId(id: number) {
    let url = this.serverPath +"/employee/getCommentList/" + id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });
  }

  //ลบข้อมูล User
  deleteMember(userId: number) {
    let url = this.serverPath + "/user/remove";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, userId, { headers: headers });
  }
}
