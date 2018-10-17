import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { CrurrentService } from '../../services/get-crurrent-service/crurrent.service';
import { Company } from '../../model/company.model';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { getPreviousOrParentNode } from '@angular/core/src/render3/instructions';
import { cuuren } from '../../model/current.model';
import { IRoleAccount } from '../../model/user.model';
import { AuthenService } from '../../../services/authen.service';
declare let App;


@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit {
  private userLogin: cuuren = new cuuren();
  private ROLE_USER: string;
  private ROLE_OWNER: string;
  private owner: string;
  private user: string;
  Role = IRoleAccount;
  AppURL = AppURL;
  AuthURL = AuthURL;
  constructor(
    private crurrentService: CrurrentService,
    private account: AccountService,
    private router: Router,
    private authen: AuthenService,

  ) { this.getCurrentCompany();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.crurrentService.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);
        // โหลดข้อมูล script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);
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
        // โหลดข้อมูล script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);

      },
      err => {
        console.log(err);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      }
    );
  }

  ngOnInit() {
    this.account.checkSession().subscribe(
      res => {
        console.log(localStorage)
        console.log()

      },
      error => {
        console.log(error)
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);


      }
    );



    //this.getCurrentCompany();






  }

}
