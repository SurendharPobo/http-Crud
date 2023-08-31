import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submit: boolean = false;

  constructor(
    private _authservice: AuthService,
    private _formbuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formbuilder.group({
      mobile_or_email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submit = true;
    if (this.loginForm.valid) {
      let user = this._authservice.login(this.loginForm.value);
      if (!user) {
        alert("Invalid Email or Password");
      }
      else {
        this._router.navigateByUrl('dashboard');
      }
    }
  }

}
