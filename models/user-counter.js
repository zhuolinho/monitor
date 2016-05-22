var mongoose = require('mongoose');

var userCounterSchema = mongoose.Schema({
                    code:{type:String, default:"users", unique:true},
                    seqs: {
                      sid1:{type: Number, default: 10000},
                      sid2:{type: Number, default: 20000},
                      sid3:{type: Number, default: 30000},
                      sid4:{type: Number, default: 40000},
                      sid5:{type: Number, default: 50000},
                      sid6:{type: Number, default: 60000},
                      sid7:{type: Number, default: 70000},
                      sid8:{type: Number, default: 80000}
                    }
              });
//
module.exports = mongoose.model('usercounter',userCounterSchema);
