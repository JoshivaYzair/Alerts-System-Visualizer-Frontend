import { ErrorComponent } from './components/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/dashboard/alert/alert.component';
import { ApplicationComponent } from './components/dashboard/application/application.component';
import { Roles } from './Services/Role';
import { HasRoleGuard } from './Services/has-role.guard';

const routes: Routes = [
  {path: '', redirectTo: 'alert', pathMatch: 'full'},
  {path: 'alert', component: AlertComponent, canActivate: [AuthGuard]},
  {path: 'application', 
   component: ApplicationComponent, 
   canActivate: [AuthGuard, HasRoleGuard],
   data:{ role: Roles.Admin}
  },
  {path: 'login', component: LoginComponent },
  {path: 'error', component: ErrorComponent },
  {path: '**', redirectTo: 'error', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
