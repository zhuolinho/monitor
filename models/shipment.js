var mongoose = require('mongoose');

var shipmentSchema = mongoose.Schema({
                    sim:{type:String,required:true},  //sim card CAN BE REVERENCE TO TO GPS
                    dest:String,
                    dt:{type:Date, default: Date.now}, //departure time
                    at:String, //arrival time
                    origin:String,
                    s:String, //Supercargo 押运员
                    dist:String, //distance
                    lp:{type:String,required:true},//license plate
                    driver:String,
                    rs:{type:String,default:""}, //refill station 加气站
                    oti:String, //original tank id(原罐号)
                    nti:String, //new tank id (换罐号)
                    ntt:String, //new tank type;
                    ed:String,  //estimated duration
                    pa:String, //processing agent
                    status:{type:Number,default:0} //0 ongoing , 1 done
              });
//
module.exports = mongoose.model('shipment',shipmentSchema);
