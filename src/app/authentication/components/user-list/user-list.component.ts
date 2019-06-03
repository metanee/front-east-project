import { Component, OnInit, TemplateRef } from '@angular/core';
import { User, UserSearchKey, UserSearch, IUser, IRoleAccount, INowJob, } from '../../../shareds/model/user.model';
import { UserService } from '../../services/user-service/user.service';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertService } from '../../../shareds/services/alert-service/alert.service';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { CompanyService } from '../../services/company-service/company.service';
import { Employee } from '../../../shareds/model/employee.model';
import { CrurrentService } from '../../../shareds/services/get-crurrent-service/crurrent.service';
import { cuuren } from '../../../shareds/model/current.model';
import { AuthenService } from '../../../services/authen.service';
declare let  App;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  modalRef: BsModalRef;
  employee: Employee;
  // ตัวแปร pagination
  startPage: number = 1;
  limitPage: number = 5;
  // ตัวแปรสำหรับค้นหา
  searchText: string = '';
  serachType: UserSearchKey;
  searchTypeItems: UserSearchKey[] = [
    { key: 'firstName', value: 'ค้นหาจากชื่อผู้ใช้' }
  ];
  // ตัวแปรรับค่า User
  items: IUser;
  private userLogin: cuuren = new cuuren();
  Role = IRoleAccount;


  constructor(

    private userService: UserService,
    private alert: AlertService,
    private router: Router,
    private modalService: BsModalService,
    private companySrvice: CompanyService,
    private crurrentService: CrurrentService,
    private authen: AuthenService

  ) {
    //ดึงข้อมูลผู้ใช้ลงในตาราง
    this.getUserList({
      startPage: this.startPage,
      limitPage: this.limitPage
    });
    this.serachType = this.searchTypeItems[0];

  }

  getJobnow(nowjob:INowJob){
    return INowJob[nowjob];
  }
  // ค้นหาข้อมูล
  onSearchItem() {
    this.getUserList({
      searchText: this.searchText,
      searchType: this.serachType.key,
      startPage: this.startPage,
      limitPage: this.limitPage

    });
    console.log(this.searchText, this.serachType)
  }

  // เปลี่ยนหน้า pagination
  onPageChanged(page: PageChangedEvent) {
    this.getUserList({
      searchText: this.searchText,
      searchType: this.serachType.key,
      startPage: page.page,
      limitPage: page.itemsPerPage
    });
  }
  // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  //ดึงข้อมูลผู้ใช้ลงในตาราง
  getUserList(options?: UserSearch) {
    this.userService.getUserList(options).subscribe(
      res => {
        this.items = res.json();
        console.log(this.items);
      },
      error => {
        console.log(error);
      }
    );
  }

  onViewMember(item: User) {
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.ViewUser,
      item.id
    ]);
  }

  onUpdateMember(item: User) {
    console.log(item.id)
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.EditUser,
      item.id
    ]);
  }

  // ลบข้อมูลสมาชิก
  onDeleteMember(item: User) {
    this.alert.confirm().then(status => {
      if (!status) return;
      this.userService
        .deleteMember(item.id).subscribe(
          res => {
            this.getUserList();
            this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
          },
          err => {
            this.alert.notify(err.Message)
          }
        );
    });
  }

  onAddEmployee(employee: Employee) {
    this.alert.confirm().then(status => {
      if (!status) return;
      this.companySrvice.addEmployee
        (employee).subscribe(
          res => {
            this.alert.notify('เพิ่มพนักงานสำเร็จ', 'info');
          },
          err => {
            this.alert.notify(err.Message)
          }
        );
    });
  }
  getCurrentCompany() {
    this.crurrentService.getCurrentCompany().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);
        // โหลดข้อมูล script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);

      },
      err => {
        console.log(err);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      }
    );
  }





  ngOnInit() {


  }

}

