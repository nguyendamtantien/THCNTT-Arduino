import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongtinComponent } from './thongtin/thongtin.component'
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"admin", component: AdminComponent,
  canActivate:[AuthGuard],
  children:[  {path:"thongtin", component: ThongtinComponent},
  ]},
  
  {path:"login", component: LoginComponent},
  {path:"", component: LoginComponent},
  {path:"register", component: RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
