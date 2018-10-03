import { Routes, RouterModule} from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RegisterComponent } from './components/register/register.component';
const RouteLists: Routes = [
  {path: '', redirectTo: AppURL.Login, pathMatch: 'full'},
  {path: AppURL.Login, component: LoginComponent},
  {path: AppURL.Register, component: RegisterComponent},
  {path: AppURL.Forgotpassword, component: ForgotpasswordComponent},
  {path: AppURL.Authen, loadChildren: './authentication/authentication.module#AuthenticationModule'}
];

export const AppRouting = RouterModule.forRoot(RouteLists);
