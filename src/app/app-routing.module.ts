import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { EditComponent } from './Components/edit/edit.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { SocialComponent } from './Components/social/social.component';
import { CardComponent } from './Components/card/card.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/login',
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
  },
  {
    path:'social',
    component:SocialComponent
  },
  {
    path:'cart',
    component:CardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
