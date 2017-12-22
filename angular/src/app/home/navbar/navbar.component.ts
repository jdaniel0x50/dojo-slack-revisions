import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { TeamService } from '../../services/team.service';
import { MessageService } from '../../services/message.service';
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
  @Output() changeTeam = new EventEmitter();
  @Output() changeChannel = new EventEmitter();
  @Input() channels: Channel[]
  @Input() teams: Team[]
  @Input() currentTeam: Team;
  @Input() currentUser;

  constructor(
    private _ChannelSerivce: ChannelService, 
    private _TeamService: TeamService, 
    private _ChannelService: ChannelService,
    private _UserService: UserService,
    private _MessageService: MessageService
  ) { }

  teamName;

  ngOnInit() {
    // console.log(this.channels)
    // this._TeamService.teamCurrentObserver.subscribe(
    //   (res) => this.currentTeam = res
    // )
    // this.currentUser = this._UserService.returnSession()
    this._TeamService.teamsObserver.subscribe(
      (res) => { this.teams = res} 
    )
    this.teamName = this.currentTeam.name;
  }

  ngOnChanges() {
    console.log("Something changed")
    console.log(this.currentTeam.name)
    this.teamName = this._TeamService.getCurrentTeam();
  }


  profileClicked(){
    this.ProfileEmitter.emit();
    console.log('Emitting')
  }

  setChannel(data){
    this._ChannelService.setCurrentChannel(data);
    this._MessageService.getChannelMsgs(data._id);
    this.changeChannel.emit(data);
  }

  setTeam(data){
    console.log("Setting team as:", data);
    this._TeamService.setCurrentTeam(data);
    this._MessageService.getChannelMsgs(data.channels[0]._id);
    this.changeTeam.emit(data);
  }
}
