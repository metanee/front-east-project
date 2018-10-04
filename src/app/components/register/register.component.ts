import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { AlertService } from '../../shareds/components/services/alert-service/alert.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from '../../shareds/services/account-service/account.service';
import { Register } from '../../shareds/model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register: Register = new Register();


  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
  ) {
    this.initialCreateFormData();
  }
  Url = AppURL;
  form: FormGroup;

  // ลงทะเบียน
  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    console.log(this.form.value);
    this.account.onRegister(this.form.value).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(error.text());

      }
    );
  }


  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cemail: ['', [Validators.required, Validators.email, this.compareEmail('email')]]
    });
  }

  // สร้าง validate เอง
  private compareEmail(emailField: string) {
    return function (confirm_email: AbstractControl) {
      if (!confirm_email.parent) return;
      const email = confirm_email.parent.get(emailField);
      const emailSubscripe = email.valueChanges.subscribe(() => {
        confirm_email.updateValueAndValidity();
        emailSubscripe.unsubscribe();
      });
      if (confirm_email.value === email.value)
        return;
      return { compare: true };
    }
  }


  ngOnInit() {
  }

}
