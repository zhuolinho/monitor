var mongoose = require('mongoose');

var gpsSchema = mongoose.Schema({
                    sim:String,  //sim card
                    rd:String,  //received date
                    rt:String, //received time
                    time:String, //yyyy-mm-dd hh:mm:ss
                    lon:String,  //longitude
                    lat:String, //latitude
                    speed:String,
                    course:String,  //angle
                    alarm:String,
                    addr:String,
                    loc:Number,   //0 reliable, 1 unreliable
                    rawd:String  //raw data
              });
//
module.exports = mongoose.model('gps',gpsSchema);
