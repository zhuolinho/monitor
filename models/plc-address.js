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
                      plcip1:{type:String, default:"无"},
                      plcip2:{type:String, default:"无"},
                      tank: {type:String, required:true}
              }
              ,{
              timestamps:true
            });

  plcAddressSchema.methods.setOwner = function (user, cb) {
      this.oID = user.oID;
      this.cuID = user.an||user.oID;
      this.muID = user.an||user.oID;
      cb(null, this);
  };

module.exports = mongoose.model('plcaddress',plcAddressSchema);
