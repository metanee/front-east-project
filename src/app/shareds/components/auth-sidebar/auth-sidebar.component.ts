import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { CrurrentService } from '../../services/get-crurrent-service/crurrent.service';
import { Company } from '../../model/company.model';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit {
  private userLogin: Company = new Company();
  AppURL = AppURL;
  AuthURL = AuthURL;
  constructor(
    private crurrentService: CrurrentService,
    private account: AccountService,
    private router: Router
  ) { }


  getCurrentCompany() {
    this.crurrentService.getCurrentCompany().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);

      },
      err => {
        console.log(err);
      }
    );
  }
  getCurrentUser() {
    this.crurrentService.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);

    },
    err => {
        console.log(err);
    }
);
}
  ngOnInit() {
    this.account.checkSession().subscribe(
      res => {

        console.log(res);
      },
      error => {
        console.log(error)
        this.router.navigate(['/', AppURL.Login]);


      }
    );


    this.getCurrentCompany();
    this.getCurrentUser();

  }

}
