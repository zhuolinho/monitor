var mongoose = require('mongoose');

var gpsAlertSchema = mongoose.Schema({
                    oID:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
                    sim:{type:String,require:true},  //sim card
                    time:String, //yyyy-mm-dd hh:mm:ss
                    lng:String,  //longitude
                    lat:String, //latitude
                    speed:String,
                    atype:String, //alert type 'speed' and 'prohibitedzone'  alert
                    an:String, //alert name (chinese)
                    addr:String,   // alert address
                    lp:String, //licence plate
                  }
                  ,{
                  timestamps:true
                });
//

gpsAlertSchema.methods.setOwner = function (user, cb) {
    this.oID = user.oID;
    this.cuID = user.an;
    this.muID = user.an;
    cb(null, this);
};

module.exports = mongoose.model('gpsalert',gpsAlertSchema);
