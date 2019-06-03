import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedsService } from '../../../../shareds/services/shareds-service/shareds.service';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { ValidatorsService } from '../../../../shareds/services/validators-service/validators.service';
import { CompanyService } from '../../../services/company-service/company.service';
import { Company } from '../../../../shareds/model/company.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UploadcompanyService } from '../../../../shareds/services/uploadimage-company-service/uploadcompany.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  public company: Company = new Company();
  private companyId: number;

  form: FormGroup;
  constructor(
    private shareds: SharedsService,
    private alert: AlertService,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private validators: ValidatorsService,
    private companyService: CompanyService,
    private uploadcompanyService: UploadcompanyService,

  ) {
    this.activeRoute.params.forEach((params: Params) => {
      this.companyId = Number.parseInt(params['id']);
      console.log(this.companyId);

    });
    this.initialCreateFormData();
    this.LoadUpdateFormData();
   }

    // บันทึกข้อมูล
  onUpdateUserInfo() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.companyService.updateCompanyInfo(this.form.value).subscribe(
      res => {
        console.log(this.form.value);
        this.alert.notify("อัพโหลดเสร็จแล้ว","info");
        this.uploadcompanyService.upload(this.company.id);
        //location.reload();


      },
      error => {
        this.alert.someting_wrong("กรุณากรอกข้อมูลให้ครบถ้วน");


      }
    );
  }

   // สร้างฟอร์ม
   private initialCreateFormData() {
    this.form = this.builder.group({
      id:[''],
      email: ['', [Validators.required, Validators.email]],
      cemail: ['', [Validators.required, Validators.email, this.validators.compareEmail('email')]],
      firstName:['',Validators.required],
      address: ['',Validators.required],
      partImage:['',Validators.required],
      phone:['',Validators.required],
    });
  }
  private LoadUpdateFormData() {
    if (!this.companyId) return;
    this.companyService.getCompanybyId(this.companyId).subscribe(res => {
      this.company = res.json();
      console.log(this.company);

      this.form.controls['id'].setValue(this.company.id);
      this.form.controls['email'].setValue(this.company.email);
      this.form.controls['firstName'].setValue(this.company.firstName);
      this.form.controls['address'].setValue(this.company.address);
      this.form.controls['partImage'].setValue(this.company.partImage);
      this.form.controls['phone'].setValue(this.company.phone);

    },
    error => {
      this.alert.notify(error.Message);
    }
  );
  }
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
  ngOnInit() {
  }

}
