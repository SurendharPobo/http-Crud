import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  saveForm: FormGroup;
  userId: any;

  constructor(
    private _service: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.userId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.saveForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      mobile_number: new FormControl(''),
      email_address: new FormControl(''),
      password: new FormControl(''),
    })

    this.getUserId(this.userId)
  }

  getUserId(id: any) {
    this._service.getUserId(id).subscribe((response) => {
      if (response) {
        this.saveForm.patchValue(response);
      }
      else {
        console.log("Error")
      }
    })
  }



  onSubmit() {
    if (this.saveForm) {
      this._service.updateUserData(this.userId,this.saveForm.value).subscribe();
      this._router.navigateByUrl('users');
    }
    else {
      console.log('Error');
    }
  }

}
