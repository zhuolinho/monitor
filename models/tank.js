var mongoose = require('mongoose');

var tankSchema = mongoose.Schema({
                      code:{type:String,required:true, unique:true},
                      addr:{type:String, default:"无"},
                      plcaddr1:{type:String, default:"无"},
                      plcaddr2:{type:String, default:"无"}
              });
module.exports = mongoose.model('tank',tankSchema);
