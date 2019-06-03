import { Component, OnInit } from '@angular/core';
import { IRoleAccount } from '../../../shareds/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedsService } from '../../../shareds/services/shareds-service/shareds.service';
import { AlertService } from '../../../shareds/services/alert-service/alert.service';
import { CompanyService } from '../../services/company-service/company.service';
import { ValidatorsService } from '../../../shareds/services/validators-service/validators.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  public usernameExists = false;
  public emailExists = false;
  public emailSent = false;
  form: FormGroup;
  positionItems: string[];
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Owner,
    IRoleAccount.Admin
  ];

  constructor(
    private builder: FormBuilder,
    private shareds: SharedsService,
    private alert: AlertService,
    private companyService: CompanyService,
    private validators: ValidatorsService,

  ) {
    this.initialCreateFormData();
    // เพิ่ม position
    this.positionItems = this.shareds.positionItems;
  }

  // บันทึกหรือแก้ไขข้อมูล
  onSubmit() {
    this.usernameExists = false;
    this.emailExists = false;
    this.emailSent = false;
    if (this.form.invalid)
    return this.alert.someting_wrong("กรุณากรอกข้อมูล");
    this.companyService.onRegister(this.form.value).subscribe(
      res =>{
        this.alert.notify("สมัคสมาชิกเรียบร้อยแล้ว กรุณาตรวจสอบรหัสผ่านได้ที่ Email","info")
      },
      error =>{
        let errorMessage = error.text();
        if(errorMessage ==="usernameExists") this.usernameExists=true;
        if(errorMessage ==="emailExists") this.emailExists=true;
        console.log(error);
      }
    )
  }



 // แสดงตัวอย่างภาพอัพโหลด
 onConvertImage(input: HTMLInputElement) {
  const imageControl = this.form.controls['partImage'];
  this.shareds
      .onConvertImage(input)
      .then(base64 => imageControl.setValue(base64))
      .catch(err => {
          input.value = null;
          imageControl.setValue(null);
          this.alert.notify(err.Message);
      });
}

  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      cemail: ['', [Validators.required, Validators.email, this.validators.compareEmail('email')]],
      firstName:['',Validators.required],
      address: ['',Validators.required],
      phone:['',Validators.required],
    });
  }

  ngOnInit() {
  }

}
