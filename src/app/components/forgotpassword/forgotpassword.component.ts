import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { AccountService } from '../../shareds/services/account-service/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public emailNotExists: boolean ;
  public forgetPasswordEmailSent: boolean;
  public recoverEmail:string;
  constructor(
    private accoun: AccountService,
    private buider: FormBuilder,
  ) {
    this.initialCreateFormData()
  }
  form: FormGroup;

  Url = AppURL;

  private initialCreateFormData() {
    this.form = this.buider.group({
      email: ['',Validators.required]
    });
  }


  onForgetPassword(){
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;

    this.accoun.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        console.log(this.recoverEmail);
        let errorMessage = error.text();
        if(errorMessage === 'Email not found') this.emailNotExists= true;
      }
    );
  }
  ngOnInit() {
  }

}
