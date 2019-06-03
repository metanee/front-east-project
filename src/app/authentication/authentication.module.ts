import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { UserEditComponent } from './components/user-list/user-edit/user-edit.component';
import { ViewUserComponent } from './components/user-list/view-user/view-user.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeCommentComponent } from './components/employees/employee-comment/employee-comment.component';
import { ViewCommentComponent } from './components/user-list/view-comment/view-comment.component';
import { CompanyEditComponent } from './components/company-list/company-edit/company-edit.component';
import { UserValidateEmployeeComponent } from './components/user-validate-employee/user-validate-employee.component';
import { EmployeeListOldComponent } from './components/employees/employee-list-old/employee-list-old.component';


@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ],

  declarations: [
    DashboardComponent,
    SettingComponent,
    ProfileComponent,
    EmployeesComponent,
    ChangePasswordComponent,
    UserListComponent,
    CompanyCreateComponent,
    UserEditComponent,
    ViewUserComponent,
    CompanyListComponent,
    EmployeeEditComponent,
    EmployeeCommentComponent,
    ViewCommentComponent,
    CompanyEditComponent,
    UserValidateEmployeeComponent,
    EmployeeListOldComponent,

  ],

  providers: []
})
export class AuthenticationModule { }
