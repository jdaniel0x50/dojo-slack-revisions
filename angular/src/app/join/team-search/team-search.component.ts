import { Component, OnInit } from '@angular/core';
import { Team } from '../../models';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent implements OnInit {

  team: Team = new Team();
  
    constructor(
      private _teamService: TeamService,
      private _router: Router
    ) { }
  
    ngOnInit() {
      console.log("At Join Page")
    }
  
    onSubmit() {
      console.log("search submitted!")
      this._teamService.joinTeam(this.team);
    }
}
