var mongoose = require('mongoose');

var plcAddressSchema = mongoose.Schema({
                      oID:String,
                      cuID:String, //created user id
                      muID:String, //modified user id
                      cd:String, // creation date
                      code:{type:String},
                      addr:{type:String,required:true},
                      cn:{type:String, default:"无"}, // company name
                      at:{type:String,required:true}, //address type
                      plcaddr1:{type:String, default:"无"},
                      plcaddr2:{type:String, default:"无"},
                      tanks: [{ code: String, cd: Date}] //created date
              }
              ,{
              timestamps:true
            });

  plcAddressSchema.methods.setOwner = function (user, cb) {
      this.oID = user.oID;
      this.cuID = user.an;
      this.muID = user.an;
      cb(null, this);
  };

module.exports = mongoose.model('plcaddress',plcAddressSchema);
