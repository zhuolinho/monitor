import {Injectable} from 'angular2/core';

@Injectable()
export class LibService{

  dateTime(){
    var rightNow = new Date();
    var datePart = rightNow.toISOString().slice(0,10);
    var timePart = rightNow.toString().slice(16,24);
    var result = datePart+" "+timePart;
    return result;
  }


  date(){
    var rightNow = new Date();
    var datePart = rightNow.toISOString().slice(0,10);
    return datePart;
  }
}
