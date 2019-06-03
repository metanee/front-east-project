import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Register } from './model/register.model';
import { AlertService } from './services/alert-service/alert.service';
import { AccountService } from './services/account-service/account.service';
import { CrurrentService } from './services/get-crurrent-service/crurrent.service';
import { ValidatorsService } from './services/validators-service/validators.service';
import { SharedsService } from './services/shareds-service/shareds.service';
import {DataTableModule} from "angular-6-datatable";

// เพิ่มภาษาไทยให้กับ Datepicker
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
import { ChangPassOwnerComponent } from './components/auth-navbar/chang-pass-owner/chang-pass-owner.component';
defineLocale('th', thLocale);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DataTableModule




  ],
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    ChangPassOwnerComponent
  ],

  exports: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    PaginationModule,
    BsDatepickerModule,
    DatePipe,
    DataTableModule,
    ChangPassOwnerComponent
  ],

  providers: [
    AlertService,
    AccountService,
    CrurrentService,
    ValidatorsService,
    Register,
    SharedsService,
    DatePipe
  ]
})
export class SharedsModule { }
