import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { TeamService } from '../../services/team.service';
import { Channel } from '../../models'
import { Team } from '../../models'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() ProfileEmitter = new EventEmitter();
  @Input() channels: Channel[]
  @Input() teams: Team[]
  currentTeam = new Team();
  currentUser;

  constructor(private _ChannelSerivce: ChannelService, private _TeamService: TeamService, private _ChannelService: ChannelService,
  private _UserService: UserService) { }

  ngOnInit() {
    console.log(this.channels)
    this._TeamService.teamCurrentObserver.subscribe(
      (res) => this.currentTeam = res
    )
    this.currentUser = this._UserService.returnSession()
  }

  profileClicked(){
    this.ProfileEmitter.emit();
    console.log('Emitting')
  }

  setChannel(data){
    this._ChannelService.updateCurrentChannelObserver(data);
  }

  setTeam(data){
    this._TeamService.updateCurrentTeamObserver(data);
  }
}
