import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { ValidatorsService } from '../../../../shareds/services/validators-service/validators.service';
import { AccountService } from '../../../../shareds/services/account-service/account.service';
import { CrurrentService } from '../../../../shareds/services/get-crurrent-service/crurrent.service';
import { ChangPassword } from '../../../../shareds/model/changpassword.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  private changpass: ChangPassword = new ChangPassword();
  private id: number;
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private crurrentService: CrurrentService,
    private validators: ValidatorsService
  ) {
    this.initialCreateFormData();
   }
  @Input('modalRef') modalRef: BsModalRef;

  // เปลี่ยนรหัสผ่าน
  onChankpassword() {
    if (this.form.invalid)
        return this.alert.someting_wrong();
        this.account.onChangePassword(this.form.value).subscribe(
          res => {
            this.alert.notify("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว",'info')
            console.log(res);
          },
          error => {
            console.log(error);
            return this.alert.someting_wrong("กรุณากรอกรหัสผ่านเก่าให้ถูกต้อง");

          }
        );
    console.log(this.form.value);
}

// สร้างฟอร์ม
private initialCreateFormData() {
    this.form = this.builder.group({
        id:[''],
        email:[''],
        old_pass: ['', [Validators.required]],
        new_pass: ['', [Validators.required, this.validators.isPassword]],
        cnew_pass: ['', [Validators.required, this.validators.comparePassword('new_pass')]]
    });
}


// ดึงข้อมูล User
getCurrentUser() {
  this.crurrentService.getCurrentUser().subscribe(
    res => {
      this.changpass = res.json();
      this.form.controls['id'].setValue(this.changpass.id);
      this.form.controls['email'].setValue(this.changpass.email);



    },
    err => {
      console.log(err);
    }
  );
}

  ngOnInit() {
    this.getCurrentUser()
  }

}
