import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Team } from '../models';

let _dbUrl: String = "/api/team/";

@Injectable()
export class TeamService {
  teamsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);
  teamCurrentObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor( private _http: Http ) { }

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

}
