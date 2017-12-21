import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsService } from '../../services/search-results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() searchResults;
  constructor(private _SearchResultsService: SearchResultsService) { }

  ngOnInit() {
    this._SearchResultsService.userSearchResults.subscribe(
      (userResults)=>{
        if(userResults.length > 0){
          this.displayedResults.userFlag = true
          this.displayedResults.userArr = userResults
        } else {
          this.displayedResults.userFlag = false
        }
      }
    )
    this._SearchResultsService.teamSearchResults.subscribe(
      (teamResults)=>{
        if(teamResults.length > 0){
          this.displayedResults.teamFlag = true
          this.displayedResults.teamArr = teamResults
        } else {
          this.displayedResults.teamFlag = false
        }
      }
    )
    this._SearchResultsService.channelSearchResults.subscribe(
      (channelResults) => {
        if (channelResults.length > 0) {
          this.displayedResults.channelFlag = true
          this.displayedResults.channelArr = channelResults
        } else {
          this.displayedResults.channelFlag = false
        }
      }
    )
  }
  displayedResults = {
    teamFlag: false,
    teamArr: [],
    channelFlag: false,
    channelArr: [],
    userFlag: false,
    userArr: [],
  }
}
