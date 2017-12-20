import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { ChannelService } from '../services/channel.service';
import { Team } from '../models'
import { Channel } from '../models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTeam = new Team();
  channels: Channel[] = []
  teams: Team[] = []

  constructor(private _TeamService: TeamService, private _ChannelService: ChannelService) { }

  ngOnInit() {
<<<<<<< HEAD
    // document.getElementById("homeComponent").onload = onHomeLoad();
    // function onHomeLoad() {
    

=======
    this._TeamService.teamCurrentObserver.subscribe(
      (response) => { 
        this.currentTeam = response;
        this._ChannelService.getTeamChannels(response._id);
        this._ChannelService.channelsObserver.subscribe(
          (channelResponse) => this.channels = channelResponse
        )
      }
    )
    this._TeamService.getUserTeams();
    this._TeamService.teamsObserver.subscribe(
      (response) => { 
        this.teams = response;
        console.log("TEAMS", this.teams) 
      }
    )
>>>>>>> upstream/master
  }

  isVisible = false;

  visibleClicked(){
    if(this.isVisible){ 
      this.isVisible = false
    }
    else {
      this.isVisible = true
    }
  }
}
