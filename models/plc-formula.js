var mongoose = require('mongoose');

// var plcFormulaSchema = mongoose.Schema({
//                       oID:String,
//                       cuID:String, //created user id
//                       muID:String, //modified user id
//                       cd:String, // creation date
//                       code:{type:String},
//                       tankType:{type:String,required:true}, //address type,
//                       cngParam:{type:String,default:'入口压力1'},
//                       lngParam:{type:String,default:'存储液位'},
//                       divisor:{type:Number,default:10},
//                       factor:{type:Number,default:18},
//                       tt:{type:Number,default:3}, //time threshold (in Hours) ---cng
//                       pt:{type:Number,default:20}, //percentage threshold --- lng. default to 20%
//                       tank: {type:String, required:true}
//               }
//               ,{
//               timestamps:true
//             });
//
//   plcFormulaSchema.methods.setOwner = function (user, cb) {
//       this.oID = user.oID;
//       this.cuID = user.an||user.oID;
//       this.muID = user.an||user.oID;
//       cb(null, this);
//   };
//
// module.exports = mongoose.model('plcformular',plcFormulaSchema);


module.exports = {}
