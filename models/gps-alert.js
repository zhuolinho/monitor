var mongoose = require('mongoose');

var gpsAlertSchema = mongoose.Schema({
                    sim:{type:String,require:true},  //sim card
                    time:String, //yyyy-mm-dd hh:mm:ss
                    lng:String,  //longitude
                    lat:String, //latitude
                    speed:String,
                    atype:String, //alert type  speed alert, prohibited route alert
                    addr:String,   // alert address
                    lp:{type:String,require:true}, //licence plate
              });
//
module.exports = mongoose.model('gpsalert',gpsAlertSchema);
