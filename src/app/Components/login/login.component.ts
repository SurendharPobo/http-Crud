import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { User } from '../user';
import {
  SocialAuthService,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submit: boolean = false;
  userModel:User;
  isLoggedin: boolean;

  constructor(
    private _authservice: AuthService,
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _toastr:ToastrService,
    private _SocialAuthService:SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this._formbuilder.group({
      UserName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this._SocialAuthService.authState.subscribe((user) => {
      if(user!=null){
        this.isLoggedin = user != null;
        this._router.navigateByUrl('/social');
      }
      else{
        this.isLoggedin = user == null;
      }

    });
  }

  get f() { return this.loginForm.controls; }

  OnSubmit() {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      // API 
      var payLoad = this.loginForm.value
      this._authservice.login(payLoad).subscribe(
        (response: any) => {
          if (response.Status === true && response.Item != null && response.Item.User != null) {
            localStorage.setItem('token', response.Item['Token']);
            localStorage.setItem('usertype', response.Item.User.Role);
            this.userModel = new User();
            this.userModel.Id = response.Item.User['Id'],
            this.userModel.Name = response.Item.User['Name'],
            this.userModel.Password = response.Item.User['Password'],
            this.userModel.MobileNumber = response.Item.User['MobileNumber'],
            this.userModel.EmailAddress = response.Item.User['EmailAddress'],
            this.userModel.Address = response.Item.User['Address'],
            this.userModel.Role = response.Item.User['Role'],
            this._toastr.success(response?.Message, 'Success');
            this._authservice.StoreUserValue(this.userModel);
            this._router.navigate(['/users']);
          } 
          else {
            this._toastr.error('You are not authorized user');
          }
        }, (error: any) => {
          this._toastr.error(error?.error.Message, 'Error');
        }
      )
    }
  } 

  login(){
    this._SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => this._router.navigate(['social']));
  }
}
