import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../../models';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  @Input() teamId: String;
  channel: Channel = new Channel();

  constructor(
    private _channelService: ChannelService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.channel._team = this.teamId;
    this._channelService.createChannel(this.channel);
    this._router.navigateByUrl("/messages");
  }
}
