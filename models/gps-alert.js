var mongoose = require('mongoose');

var gpsAlertSchema = mongoose.Schema({
                    sim:{type:String,require:true},  //sim card
                    time:String, //yyyy-mm-dd hh:mm:ss
                    lng:String,  //longitude
                    lat:String, //latitude
                    speed:String,
                    atype:String, //alert type 'speed' and 'prohibitedzone'  alert
                    an:String, //alert name (chinese)
                    addr:String,   // alert address
                    lp:String, //licence plate
              });
//
module.exports = mongoose.model('gpsalert',gpsAlertSchema);
