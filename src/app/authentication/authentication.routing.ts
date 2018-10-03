import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FindUserComponent } from './components/find-user/find-user.component';

const RouteLists: Routes = [
  { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
  { path: AuthURL.Dashboard, component: DashboardComponent },
  { path: AuthURL.Setting, component: SettingComponent },
  { path: AuthURL.Profile, component: ProfileComponent },
  { path: AuthURL.Employee, component: EmployeesComponent },
  { path: AuthURL.FindUser, component: FindUserComponent }
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
