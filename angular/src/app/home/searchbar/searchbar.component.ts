import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  constructor(private _TeamService: TeamService, private _ChannelService: ChannelService, private _UserService: UserService,
  private _MessageService: MessageService, private _Router: Router, private _SearchResultsService: SearchResultsService) { }

  ngOnInit() {
  }

  userInput =''

  searchResults={
    team:[],
    channel:[],
    user:[],
    message:[]
  }

  onSubmit(){
    if(this.userInput[0]==='@'){
      if(this.userInput[1]==='u' || this.userInput[1]==='U'){
        //search user
        console.log('You are trying to search for a user')
      } else if(this.userInput[1]==='m' || this.userInput[1]==='M'){
        //search messages
      } else if(this.userInput[1]==='t' || this.userInput[1]==='T'){
        //search team
      } else if(this.userInput[1]==='c' || this.userInput[1]==='C'){
        //search channel
      }
    } else{
      //search all
      // this.searchResults.team = this._TeamService.findTeam({input:this.userInput});
      // this.searchResults.channel = this._ChannelService.findChannel({input:this.userInput});
      // this.searchResults.message = this._MessageService.findMessage({input:this.userInput});

      // this.searchResults.user = this._UserService.findUser({input:this.userInput});
      // this._SearchResultsService.updateSearchResults(this.searchResults);
      // console.log('made it')
      // this.SearchResultEmitter.emit()
      // this._Router.navigateByUrl('messages/searchResults')
    }
  }
}
