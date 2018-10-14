import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../../shareds/model/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { AppURL } from '../../../../app.url';
import { AuthURL } from '../../../authentication.url';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private userId: number;
  private user: User = new User();

  form: FormGroup;

  positionItems: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private builder: FormBuilder,
    private alert: AlertService
  ) {
    this.activeRoute.params.forEach((params: Params) => {
      this.userId = Number.parseInt(params['id']);
      console.log(this.userId);

    });
    this.CreateFormData(),
      this.LoadUpdateFormData()
  }

  // สร้างฟอร์ม
  private CreateFormData() {
    this.form = this.builder.group({
      id: [''],
      username: [''],
      email: [''],
      partImage: [null],
      position: ['', Validators.required],
      password: [''],

      //ส่วนข้อมูลส่วนตัว
      firstName: [''],
      lastName: [''],
      birthDay: [''],
      gender: [''],
      nationality: [''],
      address: [''],
      religion: [''],

      //ส่วนที่ทำงาน
      education: [''],
      institute: [''],
      faculty: [''],
      branch: [''],
      startyearEducation: [''],
      endyearEducation: [''],
      gpaEducation: [''],
      startmonthJobexp: [''],
      startyearhJobexp: [''],
      endyearJobexp: [''],
      endmonthJobexp: [''],
      companyNameJobexp: [''],
      careerJobexp: [''],
      salaryJobexp: [''],
      descriptionJobexp: [''],
      phone: ['']
    });


    // disabled อีเมล์
    this.form.get('email').disable();
  }


  // โหลดข้อมูลใหม่พร้อมกับ Update form data
  private LoadUpdateFormData() {
    if (!this.userId) return;
    this.userService.getUserbyId(this.userId).subscribe(res => {
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
    },
      error => {
        this.alert.notify(error.Message);
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
      }
    );
  }

  ngOnInit() {



  }


}
