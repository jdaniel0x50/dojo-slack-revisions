import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from '../services/team.service';
import { ChannelService } from '../services/channel.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Team } from '../models';
import { Channel } from '../models';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser = {};
  currentTeam;
  currentChannel;
  teams: Team[] = [];
  channels: Channel[] = [];
  messages: Message[] = [];
  isVisible = false;

  constructor(
    private _TeamService: TeamService, 
    private _ChannelService: ChannelService,
    private _UserService: UserService,
    private _MessageService: MessageService,
    private _Router: Router,
  ) { }

  ngOnInit() {
    // subscribe to lists of teams, channels, messages
    // get current user, current team and current channel
    this._TeamService.teamsObserver.subscribe( teams => {
      console.log(teams);
      this.teams = teams;
    });
    this._ChannelService.channelsObserver.subscribe( channels => {
      console.log(channels);
      this.channels = channels;
    });
    this._MessageService.messagesObserver.subscribe( msgs => {
      console.log(msgs[0]);
      this.messages = msgs;
    });
    this.currentTeam = this._TeamService.getCurrentTeam();
    this.currentChannel = this._ChannelService.getCurrentChannel();
    this.currentUser = this._UserService.returnSession();








    // subscribe to the current user observable
    // and check if user logged in
    // only continue if logged in
    // if not return to login page
    // this._UserService.userSession.subscribe(
    //   (user) => {
    //     if (user['loggedIn']) {
    //       // user is logged in
    //       this.currentUser = user;
    //       // continue to get teams and channels
    //       // get teams will also assign the first team to current team observer
    //       this._TeamService.getUserTeams().then( tmRes => {
    //         // await the api call to get all user teams
    //         // subscribe to list of user teams
    //         this._TeamService.teamsObserver.subscribe(
    //           (response) => {
    //             this.teams = response;

    //             // subscribe to current team observer
    //             this._TeamService.teamCurrentObserver.subscribe(
    //               (teamResponse) => {
    //                 this.currentTeam = teamResponse;
    //                 console.log("Current team on home component is:", this.currentTeam._id);

    //                 // get all channels for selected team
    //                 // get channels will also assign the first channel to the current channel observer
    //                 this._ChannelService.getTeamChannels(this.currentTeam._id).then( chRes => {
    //                   // after receiving all channels from db
    //                   // subscribe to list of all channels for selected team
    //                   this._ChannelService.channelsObserver.subscribe(
    //                     (channels) => {
    //                       this.channels = channels;
    //                     }
    //                   );
    //                   // subscribe to the current channel to update messages
    //                   this._ChannelService.channelCurrentObserver.subscribe(
    //                     (channel) => {
    //                       this.currentChannel = channel;
    //                       // refresh messages when channel changes
    //                       this._MessageService.getChannelMsgs(this.currentChannel._id);
    //                     }
    //                   )
    //                 });
    //               }
    //             );
    //           }
    //         );
    //       });
    //     }
    //     else {
    //       // user is not logged in
    //       console.log("User not logged in; permission denied to view home component");
    //       this._Router.navigateByUrl("/");
    //     }
    //   });

  }

  ngOnDestroy() {
    console.log("Inside ngOnDestroy method");
    // this._UserService.userSession.unsubscribe();
    // this._TeamService.teamsObserver.unsubscribe();
    // this._TeamService.teamCurrentObserver.unsubscribe();
    // this._ChannelService.channelsObserver.unsubscribe();
  }


  visibleClicked(){
    if(this.isVisible){ 
      this.isVisible = false
    }
    else {
      this.isVisible = true
    }
  }
  searchSubmitted(){
    this.isVisible = true;
  }

  changedTeam() {
    this.currentTeam = this._TeamService.getCurrentTeam();
  }

  changedChannel() {
    this.currentChannel = this._ChannelService.getCurrentChannel();
  }
}
