import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { AlertService } from '../../shareds/services/alert-service/alert.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from '../../shareds/services/account-service/account.service';
import { Register } from '../../shareds/model/register.model';
import { ValidatorsService } from '../../shareds/services/validators-service/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register: Register = new Register();
	public usernameExists = false;
  public emailExists = false;
  public emailSent = false;
  public idcardExists = false;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private validators: ValidatorsService,
    private router: Router,

  ) {
    this.initialCreateFormData();
  }
  Url = AppURL;
  form: FormGroup;

  // ลงทะเบียน
  onSubmit() {
    this.usernameExists = false;
    this.emailExists = false;
    this.idcardExists = false;
  	this.emailSent = false;
    if (this.form.invalid)
      return this.alert.someting_wrong("กรุณากรอกข้อมูล");
    console.log(this.form.value);
    this.account.onRegister(this.form.value).subscribe(
      res => {
        console.log(res);
        this.alert.notify("สมัคสมาชิกเรียบร้อยแล้ว กรุณาตรวจสอบรหัสผ่านได้ที่ Email","info")
        this.router.navigate(['/', AppURL.Login]);

      },
      error => {
        let errorMessage = error.text();
        if(errorMessage ==="usernameExists") this.usernameExists=true;
        if(errorMessage ==="emailExists") this.emailExists=true;
        if(errorMessage ==="idcardExists") this.idcardExists=true;
        //this.alert.someting_wrong("เกิดข้อผิดพลาดกับระบบ กรุณาลองสมัคสมาชิกใหม่ในภายหลัง")


      }
    );
  }


  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      username: ['', [Validators.required, this.validators.isPassword]],
      email: ['', [Validators.required, Validators.email]],
      cemail: ['', [Validators.required, Validators.email, this.validators.compareEmail('email')]],
      idcard: ['',[Validators.required,this.validators.isIdcard]],
      religion: [''],
      gender: [''],
      nationality: [''],
      education: [''],
      startyearEducation: [''],
      endyearEducation: [''],
      startmonthJobexp: [''],
      startyearhJobexp: [''],
      endmonthJobexp: [''],
      endyearJobexp: ['']
    });
  }





  ngOnInit() {
  }

}
