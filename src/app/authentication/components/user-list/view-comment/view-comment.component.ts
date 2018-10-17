import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../shareds/services/alert-service/alert.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewComment } from '../../../../shareds/model/viewcomment.model';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
  public userId: number;
  private items: ViewComment = new ViewComment();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private alert: AlertService,
    private userService: UserService
  ) {
    this.activeRoute.params.forEach((params: Params) => {
      this.userId = Number.parseInt(params['id']);
      console.log(this.userId);
    });
    this.onloadComment();
  }

  onloadComment(){
//ดึงข้อมูลผู้ใช้ลงในตาราง
  this.userService.getCommentbyId(this.userId).subscribe(
    res => {
      this.items = res.json();
      console.log(this.items.userId)
      console.log(this.items);
    },
    error => {
      console.log(error);
    }
  );
}


  ngOnInit() {
  }

}
