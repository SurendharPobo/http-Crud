import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/';

  //#region UsersAPI calles
    registeruser(data: any) {
      return this._http.post(this.url + 'users', data);
    }

    login(data: any) {
      return this._http.post(this.url + 'login', data);
    }

    getUserData() {
      return this._http.get(this.url + 'users');
    }

    getUserId(id: any) {
      return this._http.get(this.url + 'users/' + id);
    }

    updateUserData(id:any,data: any) {
      return this._http.put(this.url + 'users/'+id, data);
    }
  //#endregion UsersAPI calles
  
}