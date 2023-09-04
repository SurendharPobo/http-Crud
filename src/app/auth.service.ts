import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './Components/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserProfile = new BehaviorSubject<User>(null);
  
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _router: Router) {
    var userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const USERDATA = JSON.parse(userDataString);
      this.UserProfile.next(USERDATA);
    }
  }

  //#region UsersAPI calls
  registeruser(data: any) {
    return this._http.post(environment.URL + 'Account/add-new-customer', data);
  }

  login(formData: any) {
    return this._http.post(environment.URL + 'Account/login', formData);
  }

  getUserData() {
    return this._http.get(environment.URL + 'Account/get-user');
  }

  getUserId(id: any) {
    return this._http.get(environment.URL + 'users/' + id);
  }

  updateUserData(id: any, data: any) {
    return this._http.put(environment.URL + 'users/' + id, data);
  }

  StoreUserValue(data: any): void {
    localStorage.setItem('userData', JSON.stringify(data));
    this.UserProfile.next(data);
  }
  //#endregion UsersAPI calles


  GetCartOrderList() {
    return this._http.get(environment.URL + 'Booking/get-cart-list');
  }

}