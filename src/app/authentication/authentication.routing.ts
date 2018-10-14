import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { UserEditComponent } from './components/user-list/user-edit/user-edit.component';
import { ViewUserComponent } from './components/user-list/view-user/view-user.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeCommentComponent } from './components/employees/employee-comment/employee-comment.component';

const RouteLists: Routes = [
  { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
  { path: AuthURL.Dashboard, component: DashboardComponent },
  { path: AuthURL.Setting, component: SettingComponent },
  { path: AuthURL.Profile, component: ProfileComponent },
  { path: AuthURL.Employee, component: EmployeesComponent },
  { path: AuthURL.Member, component: UserListComponent },
  { path: AuthURL.ViewUser+'/:id', component: ViewUserComponent },
  { path: AuthURL.CateCompany, component: CompanyCreateComponent },
  { path: AuthURL.Company, component: CompanyListComponent },
  { path: AuthURL.EditUser+'/:id', component: UserEditComponent },
  { path: AuthURL.EditEmployee+'/:id', component: EmployeeEditComponent },
  { path: AuthURL.Comment+'/:id', component: EmployeeCommentComponent },


];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
