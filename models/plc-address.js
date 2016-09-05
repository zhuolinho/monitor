var mongoose = require('mongoose');

var plcAddressSchema = mongoose.Schema({
                      cd:String, // creation date
                      code:{type:String},
                      addr:{type:String,required:true},
                      cn:{type:String, default:"无"}, // company name
                      at:{type:String,required:true}, //address type
                      plcaddr1:{type:String, default:"无"},
                      plcaddr2:{type:String, default:"无"},
                      tanks: [{ code: String, cd: Date}] //created date
              });
module.exports = mongoose.model('plcaddress',plcAddressSchema);
