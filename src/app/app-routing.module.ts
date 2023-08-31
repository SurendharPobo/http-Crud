import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { EditComponent } from './Components/edit/edit.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent   
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'edit/:id',
    component:EditComponent
  },
  {
    path:'changepassword',
    component:ChangepasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
