import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Team } from '../models';
import { Router } from '@angular/router';

let _dbUrl: String = "/api/team/";

@Injectable()
export class TeamService {
  teamsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);
  teamCurrentObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor( private _http: Http, private _router: Router ) { }

  updateTeamsObserver(newData: any): void {
    this.teamsObserver.next(newData);
  }
  updateCurrentTeamObserver(newData: any): void {
    this.teamCurrentObserver.next(newData);
  }

  createTeam(team: Team) {
    this._http.post(_dbUrl + "create", team)
      .subscribe(
        response => {
          this.updateCurrentTeamObserver(response.json());
        },
        error => {
          console.log("There were errors in the team creation");
          console.log(error);
        }
      );
  }

  joinTeam(team: Team) {
    console.log("At team service!!")
    this._http.post(_dbUrl + "join", team)
    .subscribe(
      response => {
        console.log("Join Team Success:", response.json())
        let x = response.json()
        if(x.Error){
          this._router.navigateByUrl("/join");
        } else {
          this._router.navigateByUrl("/messages");
        }
        this.updateCurrentTeamObserver(response.json());
      },
      error => {
        console.log("There were errors in joining this team");
        console.log(error.json());
      }
    );
  }

}
