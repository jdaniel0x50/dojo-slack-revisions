import { Component, OnInit } from '@angular/core';
import { Team } from '../models';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  team: Team = new Team();

  constructor(
    private _teaamService: TeamService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._teaamService.createTeam(this.team);
    this._router.navigateByUrl("/");
  }

}
