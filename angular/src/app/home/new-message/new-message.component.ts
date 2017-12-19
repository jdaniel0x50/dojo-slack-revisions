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
  @Input() channelId: String;
  msg: Message = new Message();

  constructor(
    private _msgService: MessageService,
    private _router: Router

  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._msgService.createMsg(this.msg);
    this.msg = new Message();
  }

}
