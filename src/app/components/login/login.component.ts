import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { AuthURL } from '../../authentication/authentication.url';
import { Login } from '../../shareds/model/login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert-service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../shareds/services/account-service/account.service';
import { AuthenService } from '../../services/authen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private login: Login = new Login();
    private credential = {'username': '' , 'password': ''};
    public accessToken: string;
    Url = AppURL;
    form: FormGroup;
    returnURL: string;


    constructor(
        private account: AccountService,
        private builder: FormBuilder,
        private alert: AlertService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private authen: AuthenService,


    ) {
       // เก็บค่า return url เพื่อ redirect หลังจาก login
       this.activateRoute.params.forEach(params => {
        this.returnURL = params.returnURL || `/${AppURL.Authen}/${AuthURL.Dashboard}`;
    });
      this.initialCreateFormData();
    }



    onLogin()  {
        if (this.form.invalid)
            return this.alert.someting_wrong();

        this.account.sendCredential(this.form.value).subscribe(
          res => {
           this.accessToken =  res.json().token;
           this.authen.setAuthenticated(this.accessToken);

           this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');

           this.router.navigateByUrl(this.returnURL);
          },
          error => {
            console.log('error');
            return this.alert.someting_wrong("กรุณากรอก username,password ให้ถูกต้อง");
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
