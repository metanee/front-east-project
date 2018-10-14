import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company-service/company.service';
import { Employee } from '../../../../shareds/model/employee.model';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { AppURL } from '../../../../app.url';
import { AuthURL } from '../../../authentication.url';
import { User } from '../../../../shareds/model/user.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  form: FormGroup;
  public employeeId: number;
  private employee: Employee = new Employee();
  private user: User = new User();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private companyService: CompanyService,
    private alert: AlertService
  ) {
    this.activeRoute.params.forEach((params: Params) => {
      this.employeeId = Number.parseInt(params['id']);
      console.log(this.employeeId);
    });

    this.CreateFormData();
    this.LoadUpdateFormData();
  }


  onUpdateEmployee() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.companyService.updateEmployeeInfo(this.form.value).subscribe(
      res => {
        console.log(this.form.value);
        this.alert.notify("อัพโหลดเสร็จแล้ว", "info");
        //location.reload();


      },
      error => {
        console.log(error);

      }
    );
  }

  onCommentEmployee(employeeId){
    this.router.navigate(['',
    AppURL.Authen,
    AuthURL.Comment,
    employeeId

  ]);

  }
  // สร้างฟอร์ม
  private CreateFormData() {
    this.form = this.builder.group({
      employeeId: [''],
      jobposition: ['', Validators.required],
      sarary: ['', Validators.required],
      firstNameEmployee: [''],
      lastNameEmployee: [''],
      partImage: ['']

    })
    this.form.get('firstNameEmployee').disable();
    this.form.get('lastNameEmployee').disable();
  }

  private LoadUpdateFormData() {
    if (!this.employeeId) return;
    this.companyService.getEmployeebyId(this.employeeId).subscribe(res => {
      this.employee = res.json();
      this.employeeId = this.employee.employeeId;
      console.log(this.employee);
      this.form.controls['employeeId'].setValue(this.employee.employeeId);
      this.form.controls['jobposition'].setValue(this.employee.jobposition);
      this.form.controls['sarary'].setValue(this.employee.sarary);
      this.form.controls['firstNameEmployee'].setValue(this.employee.user.firstName);
      this.form.controls['lastNameEmployee'].setValue(this.employee.user.lastName);
      this.form.controls['partImage'].setValue(this.employee.user.partImage);
    },
      error => {
        this.alert.notify(error.Message);
        console.log(this.employee)
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
      }
    );
  }

  ngOnInit() {
  }

}
