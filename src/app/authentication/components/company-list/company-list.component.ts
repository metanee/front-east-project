import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company-service/company.service';
import { UserSearch, UserSearchKey } from '../../../shareds/model/user.model';
import { Employee } from '../../../shareds/model/employee.model';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { Company } from '../../../shareds/model/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  items: Employee [] = [];
  searchText: string = '';
  serachType: UserSearchKey;
  searchTypeItems: UserSearchKey[] = [
    { key: 'companyId', value: 'ค้นหาจากชื่อบริษัท' }
  ];
  constructor(
    private companyService: CompanyService,
    private router: Router,
    ) {
      this.getCompanyList();
      this.serachType = this.searchTypeItems[0];
    }



  getCompanyList(options?: UserSearch) {
  	this.companyService.getCompanyList(options).subscribe(
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

  onUpdateCompany(item: Company) {
    console.log(item.id)
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.EditeCompany,
      item.id
    ]);
  }
  ngOnInit() {
  }

}
