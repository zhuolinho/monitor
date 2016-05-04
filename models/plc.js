var mongoose = require('mongoose');

var plcSchema = mongoose.Schema({
                    rawd:String  //raw data
              });
//
module.exports = mongoose.model('plc',plcSchema);
