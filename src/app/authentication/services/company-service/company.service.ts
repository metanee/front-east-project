import { Injectable } from '@angular/core';
import { Appconst } from '../../../constants/app-const';
import { Register } from '../../../shareds/model/register.model';
import { Http,Headers } from '@angular/http';
import { Employee } from '../../../shareds/model/employee.model';
import { UserSearch } from '../../../shareds/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private serverPath: string = Appconst.serverPath;
  constructor(private http: Http) { }

  onRegister(model: Register) {
    let url = "http://localhost:8080/company/newCompany";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    console.log(userInfo);
    return this.http.post(url, JSON.stringify(userInfo), { headers: tokenHeader });
  }

  addEmployee(model: Employee) {
  	let url = "http://localhost:8080/employee/add";

  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, JSON.stringify(model), {headers: tokenHeader});
  }


  getEmployeeList(options?: UserSearch) {
  	let url = "http://localhost:8080/employee/getEmployeeList";

  	let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url,  {headers: tokenHeader});
  }

  getEmployeebyId(employeeId: number) {
    let url = this.serverPath +"/employee/" + employeeId;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });
  }

  updateEmployeeInfo(model: Employee) {
    let url = this.serverPath + "/employee/updateEmployeeInfo";
    let userInfo = model;
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, JSON.stringify(userInfo), { headers: tokenHeader });
  }

  getCompanyList(options?: UserSearch) {

    let url = this.serverPath + "/company/companyList";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get( url, { headers: headers } );
    }

    newComment(model: Employee) {
      let url = "http://localhost:8080/employee/comment";

      let tokenHeader = new Headers({
        'Content-Type' : 'application/json',
        'x-auth-token' : localStorage.getItem("xAuthToken")
      });
      return this.http.post(url, JSON.stringify(model), {headers: tokenHeader});
    }

  }


