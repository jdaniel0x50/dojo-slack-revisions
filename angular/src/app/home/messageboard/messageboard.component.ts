import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {
  @Input() channelId: String;
  messages: Array<Message> = [];

  constructor(
    private _msgService: MessageService,
    private _router: Router

  ) { }

  ngOnInit() {
    this._msgService.getChannelMsgs(this.channelId);
    this._msgService.messagesObserver.subscribe(
      (msgData) => this.messages = msgData
    )
  }
  ngOnChanges(changes) {
    if (changes.channelId) {
      this._msgService.getChannelMsgs(this.channelId);
    }
  }

}
