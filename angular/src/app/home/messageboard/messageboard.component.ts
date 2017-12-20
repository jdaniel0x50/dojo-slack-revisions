import { Component, AfterViewChecked, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {
  // @Input() channelId: String;
  @ViewChild('all_messages') el_messages: ElementRef;

  // developmental variables
  teamId: String = "5a398ac2e97b1f1a38d165da";
  channelId: String = "5a398ac2e97b1f1a38d165db";

  messages: Array<Message> = [];

  constructor(
    private _msgService: MessageService,
    private _router: Router

  ) { }

  ngOnInit() {
    this._msgService.getChannelMsgs(this.channelId);
    this._msgService.messagesObserver.subscribe(
      (msgData) => {
        this.messages = msgData;
        // console.log(this.messages);
        // if (this.messages.length > 0) {
        //   window.setInterval(function() {
        //     var elem = document.querySelector(".msgsContainer");
        //     elem.scrollTop = elem.scrollHeight;
        //   }, 1000);
        // }
    });
  }
  ngAfterViewChecked() {
    console.log("VIEW INITIALIZED!");
    this.scrollToBottom();
  }
  ngOnChanges(changes) {
    if (changes.channelId) {
      this._msgService.getChannelMsgs(this.channelId);
    }
  }

  scrollToBottom(): void {
    try {
      var elem = document.querySelector(".msgsContainer");
      elem.scrollTop = elem.scrollHeight;
    }
    catch (err) { }
  }
}
