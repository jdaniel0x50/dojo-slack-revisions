import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../../models';
import { ChannelService } from '../../services/channel.service';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  @Input() teamId: String;
  channel: Channel = new Channel();
  currentTeam: String = '';

  constructor(
    private _channelService: ChannelService,
    private _router: Router,
    private _TeamService: TeamService
  ) { }

  ngOnInit() {
    // let x = this._TeamService.getCurrentTeam();
    // console.log("Current team to add too", x._id)
    this._TeamService.teamCurrentObserver.subscribe(
      (response) => { this.currentTeam = response._id }
    )
  }

  onSubmit() {
    // this.channel._team = this.teamId;
    // this._channelService.createChannel(this.channel, this.currentTeam);
    this._TeamService.teamCurrentObserver.subscribe(
      (response) => { 
        this._channelService.createChannel(this.channel, this.currentTeam)
      }
    )
    this._router.navigateByUrl("/messages");
  }
}
