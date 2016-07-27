var mongoose = require('mongoose');

var plcAlertSchema = mongoose.Schema({
                    rawd:String,  //raw data
                    wd:String, //weekday
                    ns:String,  //nanosecond
                    code:String, //C002-6328
                    atime1:String,//alert time(standard date)
                    pt:String,// processed time
                    pa:String,//processed agent
                    addr1:String,
                    iwc1:String,// instantaneous working conditions 1
                    isc1:String,//instantaneous standard conditions 1
                    p1:String,// pressure 1
                    temp1:String,//temperature 1
                    pwc1:String,// positive working conditions 1
                    rwc1:String,// reverse working conditions 1
                    cf1:String,//communication failure 1
                    er1:String,// error report 1
                    atime2:String,//alert time2(standard date)
                    p2:String,// pressure 2
                    addr2:String,
                    iwc2:String,// instantaneous working conditions 1
                    isc2:String,//instantaneous standard conditions 1
                    p2:String,// pressure 2
                    temp2:String,//temperature 2
                    pwc2:String,// positive working conditions 2
                    rwc2:String,// reverse working conditions 2
                    cf2:String,//communication failure 2
                    er2:String,// error report 2

                    am:String, //alert message  压力报警,泄漏报警,信号中断, 6%/12kg/hps(remaining amount)
                    atype:{      //alert type  -- {余量报警,001},{压力报警,002},{信号中断,003},{泄漏报警,004},{拉回报警,005},{拉回报警,005}
                      type:String
                    },
                    // addr:String, //tank address
                    tank:{
                      type:String,
                      required:true
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
