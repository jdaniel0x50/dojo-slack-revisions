import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _TeamService: TeamService, private _ChannelService: ChannelService) { }
  ngOnInit() {
  }
  currentTeam = ''
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
