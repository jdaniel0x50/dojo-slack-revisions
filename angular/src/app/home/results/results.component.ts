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
    this._SearchResultsService.searchResults.subscribe(
      (searchResults)=>{
        this.currentResults = searchResults;
        console.log('about to hit filter results')
        this.filterResults(searchResults);
      }
    )
  }
  currentResults;
  displayedResults = {
    teamFlag: false,
    teamArr: [],
    channelFlag: false,
    channelArr: [],
    messageFlag: false,
    messageArr: [],
    userFlag: false,
    userArr: [],
  }

  filterResults(searchResults){
    // if(this.currentResults.team.length > 0){
    //   if (this.currentResults.team.__zone_symbol__value.length > 0){
    //     this.displayedResults.teamFlag = true;
    //     this.displayedResults.teamArr = this.currentResults.team.__zone_symbol__value
    //   }
    // }
    // if (this.currentResults.channel.length > 0) {
    //   if (this.currentResults.channel.__zone_symbol__value.length > 0) {
    //     this.displayedResults.channelFlag = true;
    //     this.displayedResults.channelArr = this.currentResults.channel.__zone_symbol__value
    //   }
    // } 
    // if (this.currentResults.message.length > 0) {
    //   if (this.currentResults.message.__zone_symbol__value.length > 0) {
    //     this.displayedResults.messageFlag = true;
    //     this.displayedResults.messageArr = this.currentResults.message.__zone_symbol__value
    //   }
    // } 
    // console.log('user.length:', this.currentResults.user.length)
    // if (this.currentResults.user.length > 0) {
    //   console.log('user.zone.length:', this.currentResults.user.__zone_symbol__value.length)
    //   if (this.currentResults.user.__zone_symbol__value.length > 0) {
    //     this.displayedResults.userFlag = true;
    //     this.displayedResults.userArr = this.currentResults.user.__zone_symbol__value
    //   }
    // }
    let x = searchResults.user
    console.log('x:',x)
    console.log('x len:', x.length)

    console.log('user.length:', searchResults.user.length)
    console.log('user:', searchResults['user'])
    console.log('currentrsults:', searchResults)
    if (searchResults.user.length > 0) {
      this.displayedResults.userFlag = true;
      this.displayedResults.userArr = searchResults.user
    }
  }
}
