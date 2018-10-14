import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../shareds/model/employee.model';
import { CompanyService } from '../../services/company-service/company.service';
import { UserSearchKey, UserSearch, User } from '../../../shareds/model/user.model';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  items: Employee [] = [];

  searchText: string = '';
  serachType: UserSearchKey;
  searchTypeItems: UserSearchKey[] = [
    { key: 'employeeId', value: 'ค้นหาจากรหัสพนักงาน' }
  ];
  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {
    this.serachType = this.searchTypeItems[0];

  }



  onUpdateEmpoyee(item: Employee){
    this.router.navigate(['',
    AppURL.Authen,
    AuthURL.EditEmployee,
    item.employeeId
  ]);

  }

  getEmployeeList(options?: UserSearch) {
  	this.companyService.getEmployeeList(options).subscribe(
  		res => {
        this.items = res.json();
        //this.employeeList = this.company.employeeList;
        //this.employee.companyId = this.company.id;
        console.log(this.items);

  			//this.dataFetched = true;
  		},
  		err => {
  			console.log(err);
  		}
  	);
  }




  ngOnInit() {
this.getEmployeeList();
  }

}
