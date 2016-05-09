var mongoose = require('mongoose');

var gasSchema = mongoose.Schema({
                            addr:String, //tank address
                            us:String, //usage status : in use(正在使用)
                            am:String, //amount
                            p:String, //presure
                            st:String //signal status: good-良好
                            l:String //leakage: yes, no (泄漏，无泄漏)

              });
//
module.exports = mongoose.model('gas',gasSchema);
