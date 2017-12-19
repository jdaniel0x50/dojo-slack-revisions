import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() ProfileEmitter = new EventEmitter();
  constructor(private _ChannelSerivce: ChannelService) { }

  ngOnInit() {
  }

  profileClicked(){
    this.ProfileEmitter.emit();
    console.log('Emitting')
  }
}
