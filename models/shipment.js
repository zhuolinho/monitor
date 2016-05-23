var mongoose = require('mongoose');

var shipmentSchema = mongoose.Schema({
                    sim:{type:String,required:true},  //sim card CAN BE REVERENCE TO TO GPS
                    dest:String,
                    origin:String,
                    s:String, //Supercargo 押运员
                    dist:String, //distance
                    lp:{type:String,required:true},//license plate
                    driver:String,
                    rs:{type:String,default:""}, //refill station 加气站
                    oti:String, //original tank id(原罐号)
                    nti:String //new tank id (换罐号)
              });
//
module.exports = mongoose.model('shipment',shipmentSchema);
