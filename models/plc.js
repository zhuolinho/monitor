var mongoose = require('mongoose');

var plcSchema = mongoose.Schema({
                    rawd:String,  //raw data
                    stdd:String, //standard date.
                    wd:String, //weekday
                    code:String, //C002-6328
                    at:String,//alert time
                    pt:String,// processed time
                    pa:String,//processed agent
                    at:{      //alert type {type name, type id} -- {余量报警,001},{压力报警,002},{信号中断,003},{泄漏报警,004},{拉回报警,005}
                      tn:String,
                      ti:String
                    },
                    // addr:String, //tank address
                    tank:{type:String,required:true, unique:true},
                    ra:String, //remaining amount(余量报警)
                    rt:String, //remaining time(余量报警)
                    status:{
                      type:String,
                      default:'pending'
                    }, //processed, pending
                    st:[{ti:String}],  //selected tanks : ti -- tank id (拉回报警)
                    ns:String  //nanosecond
              });
//
module.exports = mongoose.model('plc',plcSchema);


 // stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
