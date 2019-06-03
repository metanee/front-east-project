import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { User } from '../../../../shareds/model/user.model';
import { AppURL } from '../../../../app.url';
import { AuthURL } from '../../../authentication.url';
import { Employee } from '../../../../shareds/model/employee.model';
import { CompanyService } from '../../../services/company-service/company.service';
import { CrurrentService } from '../../../../shareds/services/get-crurrent-service/crurrent.service';
import { cuuren } from '../../../../shareds/model/current.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  private userId: number;
  private employee: Employee = new Employee();
  private user: User = new User();
private userLogin: cuuren = new cuuren();
  form: FormGroup;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private builder: FormBuilder,
    private alert: AlertService,
    private companyService: CompanyService,
    private crurrentService: CrurrentService
  ) {
    this.activeRoute.params.forEach((params: Params) => {
      this.userId = Number.parseInt(params['id']);
      console.log(this.userId);
    });
    this.LoadUpdateFormData();
    this.CreateFormData();
   }


   onAddEmployee(employee: Employee) {
    this.alert.confirm().then(status => {
      if (!status) return;
      this.companyService.addEmployee
        (this.employee).subscribe(
          res => {
            console.log(this.employee);
            this.alert.notify('เพิ่มพนักงานสำเร็จ รอการยืนยันจากพนักงาน', 'info');
          },
          err => {
            this.alert.notify("ผู้ใช้ยังอยู่ในสถานะทำงาน")
          }
        );
    });
   }

   // สร้างฟอร์ม
  private CreateFormData() {
    this.form = this.builder.group({
      id: [''],
      username: [''],
      email: [''],
      partImage: [null],
      password: [''],

      //ส่วนข้อมูลส่วนตัว
      firstName: [''],
      lastName: [''],
      birthDay: [''],
      gender: [''],
      nationality: [''],
      address: [''],
      religion: [''],
      idcard:[''],

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
      phone: [''],

    });
    this.form.get('email').disable();
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    this.form.get('birthDay').disable();
    this.form.get('gender').disable();
    this.form.get('nationality').disable();
    this.form.get('address').disable();
    this.form.get('religion').disable();
    this.form.get('idcard').disable();
    this.form.get('education').disable();
    this.form.get('institute').disable();
    this.form.get('faculty').disable();
    this.form.get('branch').disable();
    this.form.get('startyearEducation').disable();
    this.form.get('endyearEducation').disable();
    this.form.get('gpaEducation').disable();
    this.form.get('startmonthJobexp').disable();
    this.form.get('startyearhJobexp').disable();
    this.form.get('endyearJobexp').disable();
    this.form.get('endmonthJobexp').disable();
    this.form.get('companyNameJobexp').disable();
    this.form.get('careerJobexp').disable();
    this.form.get('salaryJobexp').disable();
    this.form.get('descriptionJobexp').disable();
    this.form.get('phone').disable();
  }

  // โหลดข้อมูลใหม่พร้อมกับ Update form data
  private LoadUpdateFormData() {
    if (!this.userId) return;
    this.userService.getUserbyId(this.userId).subscribe(res => {
      this.user = res.json();
     this.employee.userId = this.user.id;
     this.employee.firstNameEmployee = this.user.firstName;
     this.employee.lastNameEmployee = this.user.lastName;
     this.employee.genderEmployee = this.user.gender;
     this.employee.startJobDate = new Date();

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
        this.alert.notify(error.Message);
        console.log(this.employee)
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
      }
    );
  }

  onViewComment(){
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.ViewComment,
      this.userId
    ]);
  }

  getCurrentUser() {
    this.crurrentService.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);
        // โหลดข้อมูล script สำหรับ sidebar
        //console.log(this.userLogin.authorities[0].authority);
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }

}
