import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shareds/services/account-service/account.service';
import { AlertService } from '../../../shareds/services/alert-service/alert.service';
import { User } from '../../../shareds/model/user.model';
import { CrurrentService } from '../../../shareds/services/get-crurrent-service/crurrent.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsService } from '../../../shareds/services/shareds-service/shareds.service';
import { UploadService } from '../../../shareds/services/uploadimage-service/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User = new User();
  form: FormGroup;
  modalRef: BsModalRef;

  nationalityItem: any[] = [
    'ไทย',
    'ญี่ปุน',
    'อเมาริกา'
  ]

  religionItem: any[] = [
    'พุทธ',
    'อิสลาม'
  ];
  positionItems: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ];


  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private current: CrurrentService,
    private alert: AlertService,
    private shareds: SharedsService,
    private modalService: BsModalService,
    private uploadService: UploadService

  ) {
    this.initialLoadUpdateFormData();
    this.initialCreateFormData();
  }

  // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // บันทึกข้อมูล
  onUpdateUserInfo() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account.updateUserInfo(this.form.value).subscribe(
      res => {
        console.log(this.form.value);
        this.alert.notify("อัพโหลดเสร็จแล้ว","info");
        this.uploadService.upload(this.user.id);
        //location.reload();


      },
      error => {
        console.log(error);

      }
    );
  }


  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.buider.group({
      id: [''],
      username: [''],
      email: [''],
      partImage: [null],
      //position: ['', Validators.required],
      password: [''],

      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      birthDay: ['',Validators.required],
       gender: ['',Validators.required],
     nationality: ['',Validators.required],
     address: [''],
     religion: ['',Validators.required],
     idcard:[''],


      education: ['',Validators.required],
      institute: ['',Validators.required],
      faculty: ['',Validators.required],
      branch: ['',Validators.required],
      startyearEducation: ['',Validators.required],
      endyearEducation: ['',Validators.required],
      gpaEducation: ['',Validators.required],

      startmonthJobexp: ['',Validators.required],
      startyearhJobexp: ['',Validators.required],
      endyearJobexp: ['',Validators.required],
      endmonthJobexp: ['',Validators.required],
      companyNameJobexp: ['',Validators.required],
      careerJobexp: ['',Validators.required],
      salaryJobexp: ['',Validators.required],
      descriptionJobexp: ['',Validators.required],
      phone: ['',Validators.required]
    });


    // disabled อีเมล์
    this.form.get('email').disable();
    this.form.get('idcard').disable();
  }


  // โหลดข้อมูลใหม่พร้อมกับ Update form data
  private initialLoadUpdateFormData() {
    this.current.getCurrentUser().subscribe(res => {
      this.user = res.json();
      console.log(this.user);
      this.form.controls['id'].setValue(this.user.id);
      this.form.controls['email'].setValue(this.user.email);
      this.form.controls['firstName'].setValue(this.user.firstName);
      this.form.controls['lastName'].setValue(this.user.lastName);
      this.form.controls['username'].setValue(this.user.username);
      this.form.controls['password'].setValue(this.user.password);
      this.form.controls['gender'].setValue(this.user.gender);
      this.form.controls['birthDay'].setValue(this.user.birthDay);
      this.form.controls['nationality'].setValue(this.user.nationality);
      this.form.controls['address'].setValue(this.user.address);
      this.form.controls['religion'].setValue(this.user.religion);
      this.form.controls['education'].setValue(this.user.education);
      this.form.controls['institute'].setValue(this.user.institute);
      this.form.controls['faculty'].setValue(this.user.faculty);
      this.form.controls['branch'].setValue(this.user.branch);
      this.form.controls['startyearEducation'].setValue(this.user.startyearEducation);
      this.form.controls['endyearEducation'].setValue(this.user.endyearEducation);
      this.form.controls['gpaEducation'].setValue(this.user.gpaEducation);
      this.form.controls['startmonthJobexp'].setValue(this.user.startmonthJobexp);
      this.form.controls['startyearhJobexp'].setValue(this.user.startyearhJobexp);
      this.form.controls['endyearJobexp'].setValue(this.user.endyearJobexp);
      this.form.controls['companyNameJobexp'].setValue(this.user.companyNameJobexp);
      this.form.controls['careerJobexp'].setValue(this.user.careerJobexp);
      this.form.controls['salaryJobexp'].setValue(this.user.salaryJobexp);
      this.form.controls['endmonthJobexp'].setValue(this.user.endmonthJobexp);
      this.form.controls['descriptionJobexp'].setValue(this.user.descriptionJobexp);
      this.form.controls['partImage'].setValue(this.user.partImage);
      this.form.controls['phone'].setValue(this.user.phone);
      this.form.controls['idcard'].setValue(this.user.idcard);

    },
      error => {
        console.log();
        (err => this.alert.notify(err.Message));
      }
    );
  }
   // แปลงไฟล์รูปเป็น Base64
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

  ngOnInit() {

  }

}
