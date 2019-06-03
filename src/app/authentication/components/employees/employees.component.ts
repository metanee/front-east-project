import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../shareds/model/employee.model';
import { CompanyService } from '../../services/company-service/company.service';
import { UserSearchKey, UserSearch, User } from '../../../shareds/model/user.model';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from '../../../shareds/services/alert-service/alert.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  items: Employee [] = [];
  employee: Employee = new Employee();
  startPage: number = 1;
  limitPage: number = 5;
  searchText: string = '';
  serachType: UserSearchKey;
  searchTypeItems: UserSearchKey[] = [
    { key: 'firstName', value: 'ค้นหาจากชื่อพนักงาน' }
  ];
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private alert: AlertService
  ) {
    this.serachType = this.searchTypeItems[0];
//ดึงข้อมูลผู้ใช้ลงในตาราง
this.getEmployeeList({
  startPage: this.startPage,
  limitPage: this.limitPage
});
this.serachType = this.searchTypeItems[0];


  }
// ค้นหาข้อมูล
onSearchItem() {
  this.getEmployeeList({
    searchText: this.searchText,
    searchType: this.serachType.key,
    startPage: this.startPage,
    limitPage: this.limitPage

  });
  console.log(this.searchText, this.serachType)
}


  onDeleteEmployee(employee){
    this.alert.confirm().then(status => {
      if (!status) return;
      this.companyService
        .deleteEmployee(employee).subscribe(
          res => {
            console.log(employee)
            this.alert.notify('ปลดพนักงานสำเร็จ', 'info');
            location.reload();
          },
          err => {
            this.alert.notify(err.Message)
          }
        );
    });
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
