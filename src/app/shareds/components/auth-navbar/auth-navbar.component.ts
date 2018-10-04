import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service/alert.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private account: AccountService,
    private router: Router,
    private alert: AlertService
    ) { }

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
