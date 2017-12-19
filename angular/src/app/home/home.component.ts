import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  isVisible = false;

  visibleClicked(){
    if(this.isVisible){ 
      this.isVisible = false
    }
    else {
      this.isVisible = true
    }
  }
}
