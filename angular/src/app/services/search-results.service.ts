import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class SearchResultsService {

  constructor() { }

  searchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);

  updateSearchResults(newResults){
    this.searchResults.next(newResults);
    console.log('Search Results:', this.searchResults)
  }
}
