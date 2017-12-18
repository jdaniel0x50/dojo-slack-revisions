import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _UserService: UserService, private _Router: Router) { }
  ngOnInit() {
  }

  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_conf: ''
  }

  onSubmit(){
    this._UserService.registerUser(this.user)
      .then(response => this._Router.navigateByUrl('/messages'))
      .catch(err => console.log(err))
  }

}
