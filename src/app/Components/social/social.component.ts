import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(private _SocialAuthService: SocialAuthService,
    private _router: Router,) { }

  ngOnInit(): void {
    this._SocialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(user)
      this.isLoggedin = user != null;
    });
    
  }


  logOut(): void {
    this._SocialAuthService.signOut()
    .then(() => this._router.navigate(['/login']));
  }
}
