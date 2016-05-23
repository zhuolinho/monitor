var lib = {};


lib.dateTime = function(){
  var rightNow = new Date();
  var datePart = rightNow.toISOString().slice(0,10);
  var timePart = rightNow.toString().slice(16,24);
  var result = datePart+" "+timePart;
  return result;
}


module.exports = lib;
