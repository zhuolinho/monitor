var mongoose = require('mongoose');

var shipmentSchema = mongoose.Schema({
                    sim:String,  //sim card CAN BE REVERENCE TO TO GPS
                    addr:String,
                    sa:String, //shipment agent
                    dist:String, //distance
                    lp:String,//license plate
                    driver:String,
                    ad:String,//assistant driver
                    oti:String, //original tank id(原罐号)
                    nti:String //new tank id (换罐号)
              });
//
module.exports = mongoose.model('shipment',shipmentSchema);
