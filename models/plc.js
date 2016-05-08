var mongoose = require('mongoose');

var plcSchema = mongoose.Schema({
                    rawd:String,  //raw data
                    stdd:String, //standard date.
                    wd:String, //weekday
                    nanosecond:String
              });
//
module.exports = mongoose.model('plc',plcSchema);
