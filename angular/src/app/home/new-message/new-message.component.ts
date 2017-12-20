import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  channelId: String = "";
  msg: Message = new Message();
  socket = io("http://localhost:8000");

  // developmental variables
  // teamId: String = "5a398ac2e97b1f1a38d165da";
  // channelId: String = "5a398ac2e97b1f1a38d165db";

  constructor(
    private _msgService: MessageService,
    private _channelService: ChannelService,
    private _router: Router
  ) { }

  ngOnInit() {
    // subscribe to the current channel
    this._channelService.channelCurrentObserver.subscribe(
      (currChannel) => {
        this.channelId = currChannel;
      });
  }

  onSubmit() {
    this.msg._channel = this.channelId;
    console.log("Submitting message:");
    console.log(this.msg);
    this._msgService.createMsg(this.msg).then(
      (result) => {
        this.socket.emit('create_message', result);
    }, (err) => console.log(err) );
    this.msg = new Message();
  }

}
