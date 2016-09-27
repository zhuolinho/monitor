var mongoose = require('mongoose');

var plcAlertSchema = mongoose.Schema({
                    oID:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
                    atime:String,//alert time
                    am:String, //alert message  压力报警,泄漏报警,信号中断, 6%/12kg/hps(remaining amount)
                    atype:{      //alert type  -- {余量报警,001},{压力报警,002},{信号中断,003},{泄漏报警,004},{拉回报警,005},{拉回报警,005}
                      type:String
                    },
                    // addr:String, //tank address
                    tank:{
                      type:String
                      // required:true
                    },
                    pt:Date, //processed time
                    pa:String, //processed agent
                    rt:String, //remaining time(for 余量报警)
                    ra:String,//余量 remaining ammount
                    status:{
                      type:Number,
                      default:0
                    }, //processed 1, pending 0
                    st:[{ti:String}] //selected tanks : ti -- tank id (拉回报警)
              }
              ,{
              timestamps:true
            });
//

plcAlertSchema.methods.setOwner = function (user, cb) {
    this.oID = user.oID;
    this.cuID = user.an;
    this.muID = user.an;
    cb(null, this);
};


module.exports = mongoose.model('plcalert',plcAlertSchema);
