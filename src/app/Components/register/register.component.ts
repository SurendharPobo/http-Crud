import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/_helper/must-match.validator';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submit: boolean = false;
  user = null;
  data = null;


  constructor(
    private _formbuilder: FormBuilder,
    private _authservice: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this._formbuilder.group({
      id: [''],
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirm_password')
      })


      this._authservice.getUserData().subscribe((data) => {
        this.data = data;
      })
  }
  get f() { return this.registerForm.controls; }

  register() {
    this.submit = true;
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this._authservice.registeruser(this.user).subscribe(response=>console.log(response));
      // this._router.navigateByUrl('users');
    }
  }

}
