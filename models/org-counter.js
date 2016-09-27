var mongoose = require('mongoose');

var orgCounterSchema = mongoose.Schema({
                    code:{type:String, default:"org", unique:true},
                    oc:{type: Number, default: 10000000000}  //organazation count
                  }
                  ,{
                  timestamps:true
                });

module.exports = mongoose.model('orgcounter',orgCounterSchema);
