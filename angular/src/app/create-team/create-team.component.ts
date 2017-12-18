import { Component, OnInit } from '@angular/core';
import { Team } from '../models';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  team: Team = new Team();

  constructor() { }

  ngOnInit() {
  }

}
