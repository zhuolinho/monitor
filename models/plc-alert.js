var mongoose = require("mongoose");

var plcAlertSchema = mongoose.Schema(
  {
    oID: String,
    cuID: String, //created user id
    muID: String, //modified user id
    y: String, //year
    m: String, //month
    d: String, //day
    atime: String, //alert time
    am: String, //alert message  压力报警,泄漏报警,信号中断, 6%/12kg/hps(remaining amount)
    smsam: String, //sms alert message 压力警报,泄漏警报,信号中断, 6%/12kg/hps(remaining amount)
    atype: {
      //alert type  -- {余量警报,001},{压力警报,002},{信号中断,003},{泄漏警报,004},{拉回警报,005},{拉回警报,005}
      type: String
    },
    addr: String, //tank address
    tank: {
      type: String
      // required:true
    },
    ttank: String, //transportable tank
    pt: String, //processed time
    pa: String, //processed agent
    rt: String, //remaining time(for 余量报警)
    ra: String, //余量 remaining ammount
    status: {
      type: Number,
      default: 0
    }, //processed 1, pending 0
    st: [{ ti: String }] //selected tanks : ti -- tank id (拉回报警)
  },
  {
    timestamps: true
  }
);
//

plcAlertSchema.methods.setOwner = function(user, cb) {
  this.oID = user.oID;
  this.cuID = user.an || "system";
  this.muID = user.an || "system";
  cb(null, this);
};

module.exports = mongoose.model("plcalert", plcAlertSchema);
