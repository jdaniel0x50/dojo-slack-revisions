import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models';
import { TeamService } from '../../services/team.service';
import { ChannelService } from '../../services/channel.service';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { SearchResultsService } from '../../services/search-results.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent implements OnInit {
  @Output() SearchResultEmitter = new EventEmitter();
  @Input() currentUser = {};
  userInput = ''

  constructor(
    private _TeamService: TeamService, 
    private _ChannelService: ChannelService, 
    private _UserService: UserService,
    private _MessageService: MessageService, 
    private _Router: Router, 
    private _SearchResultsService: SearchResultsService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.userInput[0]==='@'){
      if(this.userInput[1]==='u' || this.userInput[1]==='U'){
        //search user
        this.userInput = this.userInput.replace(new RegExp('@u', 'i') , '').trim()
        this._UserService.findUser({ input: this.userInput })
        .then(response => {this._SearchResultsService.updateUserSearchResults(response)})
        .then(next=>{
          this._SearchResultsService.updateChannelSearchResults([]);
          this._SearchResultsService.updateTeamSearchResults([]);
        });
      } else if(this.userInput[1]==='t' || this.userInput[1]==='T'){
        //search team
        this.userInput = this.userInput.replace(new RegExp('@t', 'i'), '').trim()
        this._TeamService.searchForTeams(this.userInput)
        .then(response => {this._SearchResultsService.updateTeamSearchResults(response)})
        .then(next=>{
          this._SearchResultsService.updateChannelSearchResults([]);
          this._SearchResultsService.updateUserSearchResults([]);
        });
      } else if(this.userInput[1]==='c' || this.userInput[1]==='C'){
        //search channel
        this.userInput = this.userInput.replace(new RegExp('@c', 'i'), '').trim()
        this._ChannelService.searchForChannels(this.userInput)
        .then(response =>{this._SearchResultsService.updateChannelSearchResults(response)})
        .then(next=>{
          this._SearchResultsService.updateUserSearchResults([]);
          this._SearchResultsService.updateTeamSearchResults([]);
        });
      }
    } else {
      //search all three
      this.userInput.trim()
      this._ChannelService.searchForChannels(this.userInput)
      .then(response =>{this._SearchResultsService.updateChannelSearchResults(response)})
      this._TeamService.searchForTeams(this.userInput)
      .then(response => {this._SearchResultsService.updateTeamSearchResults(response)})
      this._UserService.findUser({ input: this.userInput })
      .then(response => {this._SearchResultsService.updateUserSearchResults(response)});
    }
    this.SearchResultEmitter.emit()
    this._Router.navigateByUrl('messages/searchResults')
  }

  onClickLogout() {
    this._UserService.logoutUser();
  }
}
