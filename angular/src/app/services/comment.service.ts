import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Comment } from '../models';
import { CommaExpr } from '@angular/compiler/src/output/output_ast';


let _dbUrl: String = "/api/comment/";

@Injectable()
export class CommentService {
  commentsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  updateCommentsObserver(newData: any): void {
    this.commentsObserver.next(newData);
  }

  createComment(comment: Comment) {
    this._http.post(_dbUrl + "create", comment)
      .subscribe(
      response => {
        this.getMsgComments(comment._message);
      },
      error => {
        console.log("There were errors in the comment creation");
        console.log(error);
      });
  }

  updateComment(comment: Comment) {
    this._http.post("/api/comment/" + comment._id + "/update", comment)
      .subscribe(
      response => {
        this.getMsgComments(comment._message);
      },
      error => {
        console.log("There were errors in the comment update");
        console.log(error);
      });
  }

  getMsgComments(msgId: String) {
    this._http.get(_dbUrl + "search?mg=", msgId)
      .subscribe(
      response => {
        this.updateCommentsObserver(response.json());
      },
      error => {
        console.log("There were errors in the comments find");
        console.log(error);
      });
  }

}
