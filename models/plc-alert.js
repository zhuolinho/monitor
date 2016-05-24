var mongoose = require('mongoose');

var plcAlertSchema = mongoose.Schema({
                    rawd:String,  //raw data
                    wd:String, //weekday
                    ns:String,  //nanosecond
                    code:String, //C002-6328
                    atime:String,//alert time(standard date)
                    pt:String,// processed time
                    pa:String,//processed agent
                    am:String, //alert message  压力报警,泄漏报警,信号中断, 6%/12kg/hps(remaining amount)
                    atype:{      //alert type  -- {余量报警,001},{压力报警,002},{信号中断,003},{泄漏报警,004},{拉回报警,005},{拉回报警,005}
                      type:String
                    },
                    // addr:String, //tank address
                    tank:{
                      type:String,
                      required:true,
                      unique:true
                    },
                    rt:String, //remaining time(余量报警)
                    status:{
                      type:Number,
                      default:0
                    }, //processed 1, pending 0
                    st:[{ti:String}] //selected tanks : ti -- tank id (拉回报警)
              });
//
module.exports = mongoose.model('plcalert',plcAlertSchema);
