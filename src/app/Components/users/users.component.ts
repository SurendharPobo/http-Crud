import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users:any[]=[];

  constructor(private _authService: AuthService) {

  }

  ngOnInit() {
    this._authService.getUserData().subscribe((data:any) => {
      this.Users = data.Item['Filteritem'];
    })
  }

}
