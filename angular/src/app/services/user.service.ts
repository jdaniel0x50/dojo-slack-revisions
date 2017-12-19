import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private _Http: Http) { }

  userSession = {}

  registerUser(User){
    console.log('Registering User:', User)
    return this._Http.post('/RegisterUser/', User)
    .map(response => this.userSession = response.json())
    .toPromise()
  }

  loginUser(User){
    console.log('Logging in Use:', User)
    return this._Http.post('/LoginUser/', User)
    .map(response => this.userSession = response.json())
    .toPromise()
  }
}
