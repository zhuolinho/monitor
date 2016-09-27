var mongoose = require('mongoose');

var gasSchema = mongoose.Schema({
                            oID:String,
                            cuID:String, //created user id
                            muID:String, //modified user id

                            addr:String, //tank address
                            us:String, //usage status : in use(正在使用)
                            am:String, //amount
                            p:String, //presure
                            st:String //signal status: good-良好
                            l:String //leakage: yes, no (泄漏，无泄漏)

                  }
                  ,{
                  timestamps:true
                });
//
gasSchema.methods.setOwner = function (user, cb) {
    this.oID = user.oID;
    this.cuID = user.an;
    this.muID = user.an;
    cb(null, this);
};

module.exports = mongoose.model('gas',gasSchema);
