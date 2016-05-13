var mongoose = require('mongoose');

var userCounterSchema = mongoose.Schema({
                    code:{type:String, default:"users", unique:true},
                    seqs: {
                      sid1:{type: Number, default: 100},
                      sid2:{type: Number, default: 200},
                      sid3:{type: Number, default: 300},
                      sid4:{type: Number, default: 400},
                      sid5:{type: Number, default: 500},
                      sid6:{type: Number, default: 600},
                      sid7:{type: Number, default: 700},
                      sid8:{type: Number, default: 800}
                    }
              });
//
module.exports = mongoose.model('usercounter',userCounterSchema);
