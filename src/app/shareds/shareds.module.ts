import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()



  ],
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent
  ],

  exports: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    PaginationModule
  ],

  providers: [
    AlertService,
    AccountService,
    CrurrentService,
    ValidatorsService,
    Register,
    SharedsService
  ]
})
export class SharedsModule { }
