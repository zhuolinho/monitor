import {Injectable} from '@angular/core';

@Injectable()
export class LibService{

  // dateTime(){
  //   var rightNow = new Date();
  //   var datePart = rightNow.toISOString().slice(0,10);
  //   var timePart = rightNow.toString().slice(16,24);
  //   var result = datePart+" "+timePart;
  //   return result;
  // }

  dateTime(){
        var now = new Date(),
            tzo = -now.getTimezoneOffset(),
            pad = function(num) {
                var norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return now.getFullYear()
            + '-' + pad(now.getMonth()+1)
            + '-' + pad(now.getDate())
            + ' ' + pad(now.getHours())
            + ':' + pad(now.getMinutes())
            + ':' + pad(now.getSeconds());
  }



  date(){
    var rightNow = new Date();
    var datePart = rightNow.toISOString().slice(0,10);
    return datePart;
  }

 daysInMonth(year,month) {
      var num = new Date(parseInt(year,10), parseInt(month,10), 0).getDate();
      return num;
  }
}
