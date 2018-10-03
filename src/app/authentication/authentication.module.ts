import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FindUserComponent } from './components/find-user/find-user.component';

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
    FindUserComponent
  ]
})
export class AuthenticationModule { }
