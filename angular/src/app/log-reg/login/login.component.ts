import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _UserService: UserService, private _Router: Router) { }
  ngOnInit() {
  }

  user = {
    email: '',
    password: ''
  }
  error= ''

  onSubmit(){
    this._UserService.loginUser(this.user)
    .then(response =>{
      if(response.loggedIn){
        this._Router.navigateByUrl('/messages')
      } else {
        this.error = response.Error
      }
    })
  }

}
