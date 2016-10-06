var mongoose = require('mongoose');
//incomming plc data
var iPlcSchema = mongoose.Schema({
                    oID:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
                    cd:String,// created date
                    y:String,//year
                    m:String,//month
                    d:String,//day
                    dct:String, //data collection time
                    cdct:String, //chanel data collection time
                    addr1:String,
                    iwc1:String,// instantaneous working conditions 1
                    isc1:String,//instantaneous standard conditions 1
                    p1:String,// pressure 1
                    temp1:String,//temperature 1
                    pwc1:String,// positive working conditions 1
                    psc1:String,// positive standard conditions 1
                    rsc1:String,// reverse standard conditions 1
                    cf1:String,//communication failure 1
                    er1:String,// error report 1
                    addr2:String,
                    iwc2:String,// instantaneous working conditions 1
                    isc2:String,//instantaneous standard conditions 1
                    p2:String,// pressure 2
                    temp2:String,//temperature 2
                    pwc2:String,// positive working conditions 2
                    psc2:String,// positive standard conditions 2
                    rsc2:String,// reverse standard conditions 2
                    cf2:String,//communication failure 2
                    er2:String,// error report 2
                    tank:String
              });

    iPlcSchema.methods.setOwner = function (user, cb) {
        this.oID = user.oID;
        this.cuID = user.an||'system';
        this.muID = user.an||'system';
        cb(null, this);
    };



module.exports = mongoose.model('iplc',iPlcSchema);
