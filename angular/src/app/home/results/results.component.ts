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
    // this._SearchResultsService.searchResults.subscribe(
    //   (searchResults)=>{this.currentResults = searchResults}
    // )
  }
  currentResults;
}
