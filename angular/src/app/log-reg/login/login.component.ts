import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser = {};

  constructor(
    private _UserService: UserService,
    private _TeamService: TeamService, 
    private _Router: Router
  ) { }
  
  ngOnInit() {
    // subscribe to the current user observable
    this._UserService.userSession.subscribe(
      (user) => {
        console.log("User in SUBSCRIBE", user);
        if (user['loggedIn']) {
          // user is logged in
          // route to next page
          this.currentUser = user;
          // this._Router.navigateByUrl('/join')
        }
      });
  }

  user = {
    email: '',
    password: ''
  }
  error= ''

  onSubmit(){
    this._UserService.loginUser(this.user)
    .then(response => {
      if (response['loggedIn']) {
        console.log("Returned to login");
        console.log("Are teams set?");
        console.log(this._TeamService.currentTeam);
        if (this._TeamService.currentTeam != null) {
          // user has a team --> go to messages
          this._Router.navigateByUrl('/messages');
        }
        else {
          // user does not have a team --> create a team
          this._Router.navigateByUrl('/join');
        }
      } else {
        this.error = response['Error'];
      }
    });
  }

}
