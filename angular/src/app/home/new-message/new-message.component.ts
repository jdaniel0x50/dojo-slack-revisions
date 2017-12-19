import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  // @Input() channelId: String;

  // developmental variables
  teamId: String = "5a398ac2e97b1f1a38d165da";
  channelId: String = "5a398ac2e97b1f1a38d165db";

  msg: Message = new Message();

  constructor(
    private _msgService: MessageService,
    private _router: Router

  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.msg._channel = this.channelId;
    console.log("Submitting message:");
    console.log(this.msg);
    this._msgService.createMsg(this.msg);
    this.msg = new Message();
  }

}
