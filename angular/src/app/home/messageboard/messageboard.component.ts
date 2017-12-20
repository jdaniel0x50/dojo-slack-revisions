import { Component, AfterViewChecked, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {
  // @Input() channelId: String;
  @ViewChild('all_messages') el_messages: ElementRef;
  channelId: String = "";
  socket = io("http://localhost:8000");

  // developmental variables
  // teamId: String = "5a398ac2e97b1f1a38d165da";
  // channelId: String = "5a398ac2e97b1f1a38d165db";

  messages: Array<Message> = [];

  constructor(
    private _msgService: MessageService,
    private _channelService: ChannelService,
    private _router: Router
  ) { }

  ngOnInit() {
    // subscribe to the current channel
    this._msgService.getChannelMsgs(this.channelId);
    this._channelService.channelCurrentObserver.subscribe(
      (currChannel) => {
        this.channelId = currChannel._id;
        this._msgService.getChannelMsgs(this.channelId);
      });
    // subscribe to the messages observable (dependent on channel observer)
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

    // listen through a socket for new messages
    this.socket.on("new_message", function (data) {
      console.log("Received emit from the server for a new message!");
      if (data.message._channel === this.channelId) {
        this.messages.push(data.message);
        // this._msgService.getChannelMsgs(this.channelId);
        this.scrollToBottom();
      }
    }.bind(this));
  }
  ngAfterViewChecked() {
    // console.log("VIEW UPDATED!");
    this.scrollToBottom();
  }

  // only need ngOnChanges if channelId is an Input
  // removed when it was made an observable service
  // ngOnChanges(changes) {
  //   if (changes.channelId) {
  //     this._msgService.getChannelMsgs(this.channelId);
  //   }
  // }

  scrollToBottom(): void {
    try {
      var elem = document.querySelector(".msgsContainer");
      elem.scrollTop = elem.scrollHeight;
    }
    catch (err) { }
  }
}
