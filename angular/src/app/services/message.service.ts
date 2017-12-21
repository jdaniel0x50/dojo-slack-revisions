import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from '../models';
import { ChannelService } from './channel.service';

let _dbUrl: String = "/api/message/";

@Injectable()
export class MessageService {
  socket = io("http://localhost:4000");
  channelId: String = "";
  messagesObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(
    private _http: Http,
    private _channelService: ChannelService
  ) {
    // subscribe to the channel service to maintain the current channel
    this._channelService.channelCurrentObserver.subscribe(
      (currChannel) => {
        this.channelId = currChannel._id;
    });
  }

  updateMsgsObserver(newData: any): void {
    this.messagesObserver.next(newData);
  }

  // Socket Message Listener Functions
  msgSocketObserver() {
    let observable = new Observable(observer => {
      this.socket.on("new_message", (data) => {
        console.log("Received Emit new message from the server");
        console.log("Msg Received:", data);
        // check if the new message belongs to the user's channel
        if (data.message._channel == this.channelId) {
          // push message to an array of messages
          let messages = this.messagesObserver.getValue();
          messages.push(data.message);
          this.updateMsgsObserver(messages);
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // Socket Message Emit Functions
  emitNewMessage(msg) {
    this.socket.emit("create_message", msg);
    console.log("Emitted Message:", msg);
  }

  createMsg(msg: Message) {
    console.log("Message Service Create");
    console.log(msg);
    return new Promise((resolve, reject) => {
      this._http.post(_dbUrl + "create", msg)
        .map(response => response.json())
        .subscribe(response => {
          console.log("Completed message create and received response");
          console.log(response);
          this.getChannelMsgs(msg._channel);
          resolve(response);
        },
        error => {
          console.log("There were errors in the message creation");
          console.log(error);
          reject(error);
        });
    });
  }

  updateMsg(msg: Message) {
    this._http.post("/api/message/" + msg._id + "update", msg)
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
    this._http.get(_dbUrl + "search/ch/" + channelId)
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
