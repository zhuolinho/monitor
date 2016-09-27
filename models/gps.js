var mongoose = require('mongoose');

var gpsSchema = mongoose.Schema({
                    oID:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
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
                  }
                ,{
                  timestamps:true
                });
//

gpsSchema.methods.setOwner = function (user, cb) {
    this.oID = user.oID;
    this.cuID = user.an;
    this.muID = user.an;
    cb(null, this);
};


module.exports = mongoose.model('gps',gpsSchema);
