import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ValidatorsService } from '../../../services/validators-service/validators.service';
import { AccountService } from '../../../services/account-service/account.service';
import { CrurrentService } from '../../../services/get-crurrent-service/crurrent.service';
import { ChangPassword } from '../../../model/changpassword.model';

@Component({
  selector: 'app-chang-pass-owner',
  templateUrl: './chang-pass-owner.component.html',
  styleUrls: ['./chang-pass-owner.component.css']
})
export class ChangPassOwnerComponent implements OnInit {
  form: FormGroup;
  private changpass: ChangPassword = new ChangPassword();

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private account: AccountService,
    private crurrentService: CrurrentService,

  ) {
    this.initialCreateFormData();

  }
  @Input('modalRef') modalRef: BsModalRef;


  // เปลี่ยนรหัสผ่าน
  onChankpassword() {
    if (this.form.invalid)
        return this.alert.someting_wrong();
        this.account.onChangePasswordOwner(this.form.value).subscribe(
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
getCurrentCompany() {
  this.crurrentService.getCurrentCompany().subscribe(
    res => {
      this.changpass = res.json();
      console.log(this.changpass);
      this.form.controls['id'].setValue(this.changpass.id);
      this.form.controls['email'].setValue(this.changpass.email);



    },
    err => {
      console.log(err);
    }
  );
}

  ngOnInit() {
    this.getCurrentCompany();
  }

}
