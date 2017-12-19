import { Component, OnInit } from '@angular/core';

import { TeamService } from '../services/team.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(private _TeamService: TeamService, private _Router: Router) { }
  ngOnInit() {
  }

  onSubmit(){
  }

}
