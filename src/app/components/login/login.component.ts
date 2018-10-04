import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { AuthURL } from '../../authentication/authentication.url';
import { Login } from '../../shareds/model/login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert-service/alert.service';
import { Router } from '@angular/router';
import { AccountService } from '../../shareds/services/account-service/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private login: Login = new Login();
    private credential = {'username': '' , 'password': ''};



    constructor(
        private account: AccountService,
        private builder: FormBuilder,
        private alert: AlertService,
        private router: Router,

    ) { this.initialCreateFormData();
    }

    Url = AppURL;
    form: FormGroup;

    onLogin()  {
        if (this.form.invalid)
            return this.alert.someting_wrong();

        this.account.sendCredential(this.form.value).subscribe(
          res => {
            this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
            localStorage.setItem('xAuthToken', res.json().token);
            this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);
          },
          error => {
            console.log('error');
          }
        );
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],

        });
    }


    ngOnInit() {
    }

}
