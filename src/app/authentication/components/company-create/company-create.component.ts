import { Component, OnInit } from '@angular/core';
import { IRoleAccount } from '../../../shareds/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedsService } from '../../../shareds/services/shareds-service/shareds.service';
import { AlertService } from '../../../shareds/services/alert-service/alert.service';
import { CompanyService } from '../../services/company-service/company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {

  form: FormGroup;
  positionItems: string[];
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Employee,
    IRoleAccount.Admin
  ];

  constructor(
    private builder: FormBuilder,
    private shareds: SharedsService,
    private alert: AlertService,
    private companyService: CompanyService
  ) {
    this.initialCreateFormData();
    // เพิ่ม position
    this.positionItems = this.shareds.positionItems;
  }

  // บันทึกหรือแก้ไขข้อมูล
  onSubmit() {
    if (this.form.invalid)
    return this.alert.someting_wrong();
    this.companyService.onRegister(this.form.value).subscribe(
      res =>{
        console.log("update")
      },
      error =>{
        console.log(error);
      }
    )
  }



 // แสดงตัวอย่างภาพอัพโหลด
 onConvertImage(input: HTMLInputElement) {
  const imageControl = this.form.controls['image'];
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
      email: ['',Validators.required],
      companyName:['',Validators.required],
      username: ['',Validators.required],
      address: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

}
