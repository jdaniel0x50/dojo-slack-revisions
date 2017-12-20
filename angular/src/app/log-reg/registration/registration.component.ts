import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../models';
import { UserService } from '../../services/user.service';
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
  user: UserRegister = new UserRegister();
  
  // user2 = {
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   password_conf: ''
  // }

  onSubmit(){
    this._UserService.registerUser(this.user)
      .then(response => this._Router.navigateByUrl('/join'))
      .catch(err => console.log(err))
  }

}
