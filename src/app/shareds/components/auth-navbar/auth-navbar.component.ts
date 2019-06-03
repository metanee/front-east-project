import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service/alert.service';
import { AuthenService } from '../../../services/authen.service';
import { CrurrentService } from '../../services/get-crurrent-service/crurrent.service';
import { cuuren } from '../../model/current.model';
import { IRoleAccount } from '../../model/user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
declare let App;
@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {
  private userLogin: cuuren = new cuuren();
  AppURL = AppURL;
  AuthURL = AuthURL;
  Role = IRoleAccount;
  modalRef: BsModalRef;

  constructor(
    private account: AccountService,
    private router: Router,
    private alert: AlertService,
    private authen: AuthenService,
    private crurrentService: CrurrentService,
    private modalService: BsModalService,
    ) {
      this.getCurrentCompany();
    this.getCurrentUser();
     }

    // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCurrentUser() {
    this.crurrentService.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);
        // โหลดข้อมูล script สำหรับ sidebar

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


      },
      err => {
        console.log(err);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      }
    );
  }
  onLogout() {
    this.account.logout().subscribe(
      res => {
        this.alert.notify('ออกจากระบบสำเร็จ', 'info');

        this.router.navigate(['/', AppURL.Login]);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }



}
