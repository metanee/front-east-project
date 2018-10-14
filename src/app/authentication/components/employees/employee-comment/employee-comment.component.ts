import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../../../services/company-service/company.service';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { Employee } from '../../../../shareds/model/employee.model';
import { AppURL } from '../../../../app.url';
import { AuthURL } from '../../../authentication.url';

@Component({
    selector: 'app-employee-comment',
    templateUrl: './employee-comment.component.html',
    styleUrls: ['./employee-comment.component.css']
})
export class EmployeeCommentComponent implements OnInit {
    form: FormGroup;
    public employeeId: number;
    public employee: Employee = new Employee();

    constructor(
        private builder: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private companyService: CompanyService,
        private alert: AlertService
    ) {

      this.CreateFormData();

      this.activeRoute.params.forEach((params: Params) => {
        this.employeeId = Number.parseInt(params['id']);
        //console.log(this.employeeId);
      });
     }

// สร้างฟอร์ม
private CreateFormData() {
  this.form = this.builder.group({
    employeeId: [''],
    userId:[''],
    jobposition: ['', Validators.required],
    sarary: ['', Validators.required],
    firstNameEmployee: [''],
    lastNameEmployee: [''],
    commentcription:['', Validators.required],
    companyId:[''],
    partImage: ['']

  })
}

onNewComment() {
  if (this.form.invalid) return this.alert.someting_wrong();
  this.companyService.newComment(this.form.value).subscribe(
    res => {
      this.alert.notify("กรอกข้อมูลความประพฤติ เรียบร้อย","info");
    },
    error => {
      this.alert.someting_wrong("กรุณากรอกข้อมูลความประพฤติ");
      console.log(error.text());
    }
  );
}
onUpdateEmployee(){
  console.log(this.form.value)
  console.log(this.employeeId)
}

private LoadUpdateFormData() {
  if (!this.employeeId) return("abcdcdc");
  this.companyService.getEmployeebyId(this.employeeId).subscribe(res => {
    this.employee = res.json();
    console.log(this.employee)
    //console.log(this.employee);
    this.form.controls['employeeId'].setValue(this.employee.employeeId);
    this.form.controls['userId'].setValue(this.employee.user.id);
    this.form.controls['sarary'].setValue(this.employee.sarary);
    this.form.controls['companyId'].setValue(this.employee.company.id);
    this.form.controls['jobposition'].setValue(this.employee.jobposition);
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
      this.LoadUpdateFormData();
    }

}
