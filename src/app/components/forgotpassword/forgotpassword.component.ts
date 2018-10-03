import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }

  Url = AppURL;
  ngOnInit() {
  }

}
