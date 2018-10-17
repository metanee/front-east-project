import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRoleAccount } from '../shareds/model/user.model';
import { CrurrentService } from '../shareds/services/get-crurrent-service/crurrent.service';
import { AuthenService } from '../services/authen.service';
import { cuuren } from '../shareds/model/current.model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  public userLogin: cuuren = new cuuren();
  constructor(
    private authen: AuthenService,
    private curunt: CrurrentService
) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles: IRoleAccount[] = next.data.roles;
    this.curunt.getCurrentUser().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin.id)
    },
    eroor =>{
       console.log("ผู้ใช้ Company");
    });
    this.curunt.getCurrentCompany().subscribe(
      res => {
        this.userLogin = res.json();
        console.log(this.userLogin);


      },
      err => {
        console.log(err);
      }
    );
    console.log(roles);
    if (roles.filter(item => item == this.userLogin.role).length > 0)
                        return true;
                    else
                        return false;
}

}

