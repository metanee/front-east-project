import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { CrurrentService } from '../../services/get-crurrent-service/crurrent.service';
import { Company } from '../../model/company.model';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { getPreviousOrParentNode } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit {
  private userLogin: Company = new Company();
  private ROLE_USER: string;
  private ROLE_OWNER: string;
  private owner: string;
  private user: string;
  AppURL = AppURL;
  AuthURL = AuthURL;
  constructor(
    private crurrentService: CrurrentService,
    private account: AccountService,
    private router: Router
  ) { this.getCurrentCompany();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.crurrentService.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        //console.log(this.userLogin.authorities[0].authority);



      },
      err => {
        console.log(err);
      }
    );
  }

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

  ngOnInit() {
    this.account.checkSession().subscribe(
      res => {
        console.log("Secsion Active")

      },
      error => {
        console.log(error)
        this.router.navigate(['/', AppURL.Login]);


      }
    );



    //this.getCurrentCompany();






  }

}
