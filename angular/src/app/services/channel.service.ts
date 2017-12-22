import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Channel } from '../models';
// import { MessageService } from './message.service';

let _dbUrl: String = "/api/channel/";

@Injectable()
export class ChannelService {
  channelsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);
  channelCurrentObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  // new
  currentChannel = null;

  constructor(
    private _http: Http,
    // private _messageService: MessageService
  ) { }

  updateChannelsObserver(newData: any): void {
    this.channelsObserver.next(newData);
  }
  setCurrentChannel(newChannel) {
    this.currentChannel = newChannel;
    // this._messageService.getChannelMsgs(newChannel._id);
  }
  getCurrentChannel() {
    return this.currentChannel;
  }
  updateCurrentChannelObserver(newData: any): void {
    this.channelCurrentObserver.next(newData);
    console.log("Active Channel:", this.channelCurrentObserver)
  }

  createChannel(channel: Channel, id: String): any {
    return new Promise((resolve, reject) => {
      this._http.post(_dbUrl + "" + id + "/create", channel)
        .subscribe(
          response => {
            this.setCurrentChannel(response.json());
            let channels = this.channelsObserver.getValue();
            channels.push(response.json());
            this.updateChannelsObserver(channels);
            resolve(response.json());
          },
          error => {
            console.log("There were errors in the channel creation");
            console.log(error);
            reject(error);
          }
        );
      }
    );
  }

  getTeamChannels(teamId: String) {
    return new Promise((resolve, reject) => {
      this._http.get("/api/team/" + teamId + "/channels")
        .subscribe(
          response => {
            console.log("Received channels from db");
            console.log(response.json());
            this.updateChannelsObserver(response.json());
            this.setCurrentChannel(response[0]);
            
            // use first channel id to assign first channel to current channel observer
            // let firstChannelId: String = this.channelsObserver.getValue()[0]._id;
            // console.log("Inside channel service: getUserChannels");
            // console.log("First channel id string:", firstChannelId);
            // this.setCurrChannel(firstChannelId).then(
            //   res => {
            //     resolve(response.json());
            //   }
            // );
          },
          error => {
            console.log("There were errors in the attempt to get the team channels");
            console.log(error);
            reject(error);
          }
        );
      }
    );
  }

  setCurrChannel(channelId: String) {
    // from a string id, retrieve the channel
    // and update the current channel observer
    return new Promise((resolve, reject) => {
      this._http.get(_dbUrl + "" + channelId)
        .subscribe(
          response => {
            console.log("Received first channel response from db");
            console.log("First/Current Channel =", response.json());
            this.updateCurrentChannelObserver(response.json());
            resolve(response);
          },
          error => {
            console.log("Errors in the attempt to get current channel from db");
            reject(error);
          }
        );
      }
    );
  }

  searchForChannels(Input) {
    return this._http.get(`/api/channel/search/q/${Input}`)
      .map(response => response.json())
      .toPromise()
  }

}
