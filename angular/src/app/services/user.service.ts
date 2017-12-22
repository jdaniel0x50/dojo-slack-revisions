import { Injectable } from '@angular/core';
import { TeamService } from './team.service';
import { ChannelService } from './channel.service';
import { MessageService } from './message.service';

import { BehaviorSubject } from 'Rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(
    private _Http: Http,
    private _router: Router,
    private _teamService: TeamService,
    private _channelService: ChannelService,
    private _messageService: MessageService,
  ) { }

  userSession: BehaviorSubject<any> = new BehaviorSubject([]);

 returnSession(){
   return this.userSession.getValue();
 }

  registerUser(User){
    console.log('Registering User:', User)
    return this._Http.post('/RegisterUser/', User)
      .map(response => {
        this.userSession.next(response.json());

      })
      .toPromise()
  }

  loginUser(User){
    console.log('Logging in Use:', User)
    return new Promise((resolve, reject) => {
      this._Http.post('/LoginUser/', User)
        .map(response => response.json())
        .subscribe(response => {
          console.log("Adding response to observable -- make sure it is json --", response);
          this.userSession.next(response);
          this.initUserMsgSvc().then( res => {
            console.log("Past init user msg");
            console.log("Current team in team service:")
            console.log(this._teamService.currentTeam)
            resolve(response);
          });
        },
        error => {
          console.log("There were errors in the login procces in the database");
          reject(error);
        });
    });
  }

  logoutUser() {
    console.log("Logging Out User:", this.userSession.getValue());
    this._Http.get('/LogoutUser');    // reset session on server
    this.userSession.next({});        // reset observable on angular
    console.log("User Logged Out ... userSession:", this.userSession.getValue());
    this._router.navigateByUrl("/");
  }

  findUser(searchInput){
    console.log('Searching for user:', searchInput)
    return this._Http.post('/findUser', searchInput)
      .map(response => response.json())
      .toPromise()
  }

  initUserMsgSvc(): any {
    // use an api call to gather team and channel after login
    // if the user does not have a team, the api will return
    // a false key, which will be used to redirect to the 
    // team create component
    // server uses the logged in session id
    return new Promise((resolve, reject) => {
      this._Http.get('/api/user/initmsgservice')
      .map(response => response.json())
      .subscribe(
        response => {
          console.log(response);
          
          // check if user has teams
          if (response.hasTeams) {
            // user has teams --> proceed to set teams
            // set teams and current team in team service
            this._teamService.updateTeamsObserver(response.teams);
            this._teamService.setCurrentTeam(response.team);

            // set channels and current channel in channel service
            this._channelService.updateChannelsObserver(response.channels);
            this._channelService.setCurrentChannel(response.channel);
            this._messageService.getChannelMsgs(response.channel._id);
          }
          resolve(response);
        },
        error => {
          reject(error);
        }
      )
    });
  }
}
