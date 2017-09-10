var mongoose = require('mongoose');

var tankSchema = mongoose.Schema({
                    cuID:String, //created user id
                    muID:String, //modified user id
                    addr:String,
                    plc:String,
                    ld: String, // logic data
                    oID:{type:Number,required:true}, //organization id (counter Number)
                    tank: {type:String, required:true}
              }
              ,{
              timestamps:true
            });
//

tankSchema.methods.setOwner = function (user, cb) {
    this.oID = user.oID;
    this.cuID = user.an||user.oID;
    this.muID = user.an||user.oID;
    cb(null, this);
};

module.exports = mongoose.model('tank',tankSchema);
