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
    console.log("Active Team:", this.teamsObserver)
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
        this.updateCurrentTeamObserver(response.json());
        if(x.Error){
          this._router.navigateByUrl("/join");
        } else {
          this._router.navigateByUrl("/messages");
        }
      },
      error => {
        console.log("There were errors in joining this team");
        console.log(error.json());
      }
    );
  }
  //No parameter passed in because I am using session to grab the user's teams by ID
  getUserTeams() {
    console.log("Getting User teams....")
    this._http.get("/api/user/teams")
    .subscribe(
      response => {
        this.updateTeamsObserver(response.json())
      },
      error => {
        console.log("Errors getting user teams")
      }
    )
  }

}
