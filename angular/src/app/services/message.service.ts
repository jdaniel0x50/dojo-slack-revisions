import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Message } from '../models';

let _dbUrl: String = "/api/message/";

@Injectable()
export class MessageService {
  messagesObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  updateMsgsObserver(newData: any): void {
    this.messagesObserver.next(newData);
  }

  createMsg(msg: Message) {
    this._http.post(_dbUrl + "create", msg)
      .subscribe(
      response => {
        this.getChannelMsgs(msg._channel);
      },
      error => {
        console.log("There were errors in the message creation");
        console.log(error);
      });
  }

  updateMsg(msg: Message) {
    this._http.post("/api/message/" + msg._id + "create", msg)
      .subscribe(
      response => {
        this.getChannelMsgs(msg._channel);
      },
      error => {
        console.log("There were errors in the message update");
        console.log(error);
      });
  }

  getChannelMsgs(channelId: String) {
    this._http.get(_dbUrl + "/search?ch=", channelId)
      .subscribe(
      response => {
        this.updateMsgsObserver(response.json());
      },
      error => {
        console.log("There were errors in the message find");
        console.log(error);
      });
  }

}
