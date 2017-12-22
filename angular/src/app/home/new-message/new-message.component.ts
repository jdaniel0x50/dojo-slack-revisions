import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Message, Channel } from '../../models';
import { MessageService } from '../../services/message.service';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';
// import * as enter from 'ng-textarea-enter';
import { window } from 'Rxjs/operator/window';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  @Input() currentChannel: Channel;
  msg: Message = new Message();

  // developmental variables
  // teamId: String = "5a398ac2e97b1f1a38d165da";
  // channelId: String = "5a398ac2e97b1f1a38d165db";

  constructor(
    private _msgService: MessageService,
    private _channelService: ChannelService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // document.getElementById("#message_input").addEventListener("keydown", function() {
    //   console.log("KEY WAS PRESSED");

    // })
  }

  onSubmit() {
    this.msg._channel = this.currentChannel._id;
    console.log("Submitting message:");
    console.log(this.msg);
    this._msgService.createMsg(this.msg).then(
      (result) => console.log(result), 
      (err) => console.log(err) );
    this.msg = new Message();
  }

  textareaAction() {
    console.log("In TextareaAction ******")
  //   // document.getElementById("#message_input").onkeyp
  //   // keypress(function (key) {
  //   //   if (key.which == 13) {
  //   //     // if key press is enter, submit the message
  //   //     console.log("ENTER Key Pressed");
  //   //   }
  //   // })
  }
}
