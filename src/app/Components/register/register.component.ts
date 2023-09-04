import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/Utilities/must-match.validator';
import { SignUp } from 'src/app/Utilities/signUp';
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
  signUpModel:SignUp;  


  constructor(
    private _formbuilder: FormBuilder,
    private _authservice: AuthService,
    private _router: Router,
    private _toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.registerForm = this._formbuilder.group({
      id: [0],
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      role:[''],
      address:[''],
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });

  }
  get f() { return this.registerForm.controls; }

  register() {
    this.submit = true;
    if (this.registerForm.valid) {
      this.user=this.registerForm.value;
      this.signUpModel=new SignUp();
      this.signUpModel.Id=0,
      this.signUpModel.Name=this.registerForm.value.name,
      this.signUpModel.Password=this.registerForm.value.password,
      this.signUpModel.MobileNumber=this.registerForm.value.mobile_number,
      this.signUpModel.EmailAddress=this.registerForm.value.email_address,
      this.signUpModel.Address='',
      this.signUpModel.Role='',
      this._authservice.registeruser(this.signUpModel).subscribe((response:any)=>
        {
          if (response.Status === true && response.Item != null) {
            console.log(response);
            this._router.navigate(['/login']);
            this._toastr.success(response?.Message, 'Success');
          }
          else{

          }
        },(error:any)=>{
        this._toastr.error(error?.error.Message, 'Error');
      });
    }
  }

}
