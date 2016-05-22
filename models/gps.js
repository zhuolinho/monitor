var mongoose = require('mongoose');

var gpsSchema = mongoose.Schema({
                    sim:{type:String,require:true},  //sim card
                    rd:String,  //received date
                    rt:String, //received time
                    time:String, //yyyy-mm-dd hh:mm:ss
                    lng:String,  //longitude
                    lat:String, //latitude
                    speed:String,
                    course:String,  //angle
                    alarm:String,
                    loc:Number,   //0 reliable, 1 unreliable
                    lp:{type:String,require:true}, //licence plate
                    rawd:String  //raw data
              });
//
module.exports = mongoose.model('gps',gpsSchema);
