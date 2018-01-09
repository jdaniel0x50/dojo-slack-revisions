import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Team } from '../models';
import { ChannelService} from '../services/channel.service';
import { Router } from '@angular/router';

let _dbUrl: String = "/api/team/";

@Injectable()
export class TeamService {
  teamsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);
  teamCurrentObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  // new
  currentTeam = null;
  allTeams = [];

  constructor( 
    private _http: Http, 
    private _router: Router,
    private _channelService: ChannelService
  ) { }

  updateTeamsObserver(newData: any): void {
    this.teamsObserver.next(newData);
  }
  setCurrentTeam(newTeam) {
    this.currentTeam = newTeam;
    this._channelService.getTeamChannels(newTeam._id);
  }
  getCurrentTeam() {
    return this.currentTeam;
  }
  updateCurrentTeamObserver(newData: any): void {
    this.teamCurrentObserver.next(newData);
    // console.log("Active Team:", this.teamCurrentObserver.getValue());
  }

  createTeam(team: Team) {
    this._http.post(_dbUrl + "create", team)
      .subscribe(
        response => {
          console.log("RESPONSE WE ARE LOOKING FOR", response.json())
          this.setCurrentTeam(response.json());
          let teams = this.teamsObserver.getValue();
          teams.push(response.json());
          this.updateTeamsObserver(teams);
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
        this.setCurrentTeam(response.json());
        let teams = this.teamsObserver.getValue();
        teams.push(response.json());
        this.updateTeamsObserver(teams);
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
    return new Promise((resolve, reject) => {
      this._http.get("/api/user/teams")
        .subscribe(
          response => {
            // assign all teams to teams observer
            this.updateTeamsObserver(response.json());

            // use first team id to assign first team to current team observer
            let firstTeamId: String = this.teamsObserver.getValue()[0]._id;
            console.log("Inside team service: getUserTeams")
            console.log("First team id string:", firstTeamId);
            this.setCurrTeam(firstTeamId).then(
              res => {
                resolve(response.json());
              }
            );
          },
          error => {
            console.log("Errors getting user teams")
            reject(error);
          });
      }
    );
  }

  setCurrTeam(teamId: String) {
    // from a string id, retrieve the team
    // and update the current team observer
    return new Promise((resolve, reject) => {
      this._http.get(_dbUrl + "" + teamId)
        .subscribe(
          response => {
            console.log("Received first team response from db");
            console.log("First/Current Team =", response.json());
            this.updateCurrentTeamObserver(response.json());
            resolve(response);
          },
          error => {
            console.log("Errors in the attempt to get current team from db");
            reject(error);
          }
        );
      }
    );
  }

  getCurrentTeamId(){
    this.teamCurrentObserver.subscribe(
      (response) => { 
        return response._id 
      }
    )
  }
  searchForTeams(Input){
    return this._http.get(`/api/team/search/q/${Input}`)
    .map(response => response.json())
    .toPromise()
  }

}
