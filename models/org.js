var mongoose = require('mongoose');

var organizationSchema = mongoose.Schema({
                    name:String,
                    Desc:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
                    oID:{type:Number,unique:true, required:true}, //organization id (counter Number)
                    email:{type:String,unique:true, required:true},
                    ouc: {    //organization user counter
                      sid1:{type: Number, default: 10000000000},
                      sid2:{type: Number, default: 20000000000},
                      sid3:{type: Number, default: 30000000000},
                      sid4:{type: Number, default: 40000000000},
                      sid5:{type: Number, default: 50000000000},
                      sid6:{type: Number, default: 60000000000},
                      sid7:{type: Number, default: 70000000000},
                      sid8:{type: Number, default: 80000000000}
                    }
              }
              ,{
              timestamps:true
            });
//
module.exports = mongoose.model('org',organizationSchema);
