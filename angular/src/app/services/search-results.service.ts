import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class SearchResultsService {

  constructor() { }

  userSearchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);
  teamSearchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);
  channelSearchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);

  updateUserSearchResults(newResults){
    this.userSearchResults.next(newResults);
  }
  updateTeamSearchResults(newResults) {
    this.teamSearchResults.next(newResults);
  }
  updateChannelSearchResults(newResults) {
    this.channelSearchResults.next(newResults);
  }
}
