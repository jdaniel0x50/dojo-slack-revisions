import { Component, AfterViewChecked, ViewChild, ElementRef, OnInit, Input, OnDestroy} from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {
  @Input() messages: Array<Message> = [];
  @ViewChild('all_messages') el_messages: ElementRef;
  // messages: Array<Message> = [];
  channelId: String = "";
  connection;

  // developmental variables
  // teamId: String = "5a398ac2e97b1f1a38d165da";
  // channelId: String = "5a398ac2e97b1f1a38d165db";

  constructor(
    private _msgService: MessageService,
    private _channelService: ChannelService,
    private _router: Router
  ) { }

  ngOnInit() {
    // subscribe to the current channel observable
    // and get channel's messages
    // this._channelService.channelCurrentObserver.subscribe(
    //   (currChannel) => {
    //     this.channelId = currChannel._id;
    //     this._msgService.getChannelMsgs(this.channelId);
    //   });

    // subscribe to the messages observable
    // this._msgService.messagesObserver.subscribe(
    //   (msgData) => {
    //     this.messages = msgData;
    // });

    // subscribe to the socket connection to receive new messages from server broadcast
    this._msgService.msgSocketObserver().subscribe();
  }
  ngOnDestroy() {
    // this._msgService.messagesObserver.unsubscribe();
    // this._msgService.msgSocketObserver();
  }

  ngAfterViewChecked() {
    // console.log("VIEW UPDATED!");
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      var elem = document.querySelector(".msgsContainer");
      elem.scrollTop = elem.scrollHeight;
    }
    catch (err) { }
  }
}
