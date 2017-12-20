import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() ProfileEmitter = new EventEmitter();
  constructor(private _ChannelSerivce: ChannelService, private _TeamService: TeamService, private _ChannelService: ChannelService) { }
  ngOnInit() {
  }

  profileClicked(){
    this.ProfileEmitter.emit();
    console.log('Emitting')
  }
}
