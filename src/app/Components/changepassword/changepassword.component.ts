import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/Utilities/must-match.validator';
import { AuthService } from 'src/app/auth.service';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  changepasswordForm:FormGroup;
  submit=false;
  show=false;
  password;

  constructor(private _authservice:AuthService,
    private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.changepasswordForm=this._fb.group({
      oldPassword:['',Validators.required,PasswordValidators.validoldPassword],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('newPassword', 'confirmPassword')
    }
    )

    this.password='password'
  }

  get f() { return this.changepasswordForm.controls; }

  onSubmit(){
    this.submit=true
  }

  onClick(){
    this.show=true;
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
