import { Component, OnInit } from '@angular/core';
import { Channel } from '../models';
import { ChannelService } from '../services/channel.service';
import { TeamService } from '../services/team.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  // @Input() teamId: String;
  channel: Channel = new Channel();
  currentTeamId: String = '';

  constructor(
    private _channelService: ChannelService,
    private _router: Router,
    private _TeamService: TeamService,
    private _MessageService: MessageService
  ) { }

  ngOnInit() {
    let team = this._TeamService.getCurrentTeam();
    this.currentTeamId = team._id;
    // let x = this._TeamService.getCurrentTeam();
    // console.log("Current team to add too", x._id)
    // this._TeamService.teamCurrentObserver.subscribe(
    //   (response) => { 
    //     this.currentTeam = response._id;
    //     console.log("Create Channel OnInit -- Current Team", this.currentTeam);
    //   }
    // )
  }

  onSubmit() {
    // this.channel._team = this.teamId;
    // this._channelService.createChannel(this.channel, this.currentTeam);
    // this._TeamService.teamCurrentObserver.subscribe(
    //   (response) => { 

    console.log("Channel:", this.channel);
    console.log("Team ID", this.currentTeamId);
    this._channelService.createChannel(this.channel, this.currentTeamId)
      .then( res => {
        this._MessageService.getChannelMsgs(res._id);
      });


    // }
    // )
    // this._router.navigateByUrl("/messages");
  }
}
