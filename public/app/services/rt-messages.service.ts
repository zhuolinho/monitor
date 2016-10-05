import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

declare var io:any;

@Injectable()
export class RTMessagesService {
  private sockets = {};

  public constructor() {}

  connect(port){
    var ns = this.getUser().oID;
    var url = 'http://'+window.location.hostname+':'+port;
    var socket = io(url);
    this.sockets[ns] = socket;
  }

  on(eventName, callback) {
    var that = this;
    var ns = this.getUser().oID;
    this.sockets[ns].on(eventName+':'+ns, function (args) {
      console.log("got event from socket----",args);
      if(callback){
        callback(args);
      }
    });
  }


  emit(eventName, data, callback) {
    var that = this;
    var ns = this.getUser().oID;
    that.sockets[ns].emit(eventName+':'+ns, data, function (args) {
      if(callback){
        callback(args);
      }
    })
  }

  getUser(){
      return JSON.parse(sessionStorage.getItem('user'));
  }

}
