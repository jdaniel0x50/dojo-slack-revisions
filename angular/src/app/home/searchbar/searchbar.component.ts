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
    user:[]
  }

  onSubmit(){
    if(this.userInput[0]==='@'){
      if(this.userInput[1]==='u' || this.userInput[1]==='U'){
        //search user
        this.searchResults.user = this._UserService.findUser({ input: this.userInput });
      } else if(this.userInput[1]==='t' || this.userInput[1]==='T'){
        //search team
      } else if(this.userInput[1]==='c' || this.userInput[1]==='C'){
        //search channel
      }
    } else{
      //search all three
      this.searchResults.user = this._UserService.findUser({input:this.userInput});
    }
    this._SearchResultsService.updateSearchResults(this.searchResults);
    console.log('made it')
    this.SearchResultEmitter.emit()
    this._Router.navigateByUrl('messages/searchResults')
}
