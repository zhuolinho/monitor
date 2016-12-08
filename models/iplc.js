var mongoose = require('mongoose');
//incomming plc data
var iPlcSchema = mongoose.Schema({

                    //comon fields
                    oID:String,
                    cuID:String, //created user id
                    muID:String, //modified user id
                    cd:String,// created date
                    y:String,//year
                    m:String,//month
                    d:String,//day
                    dct:String, //data collection time
                    cdct:String, //chanel data collection time
                    cdcns:String, //Chanel date collections nanosecond
                    plcCode:{type:String,required:true},
                    tank:String,
                    plcType:{type:String,required:true}, //guanwang, cng, lng
                    laddr:String, //location address


                    //guanwang ((S7-200 Smart plc)
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


                    //cng 0, 2
                    inputP1:String, //inut presure1 入口压力1 MPa
                    inputP2:String, //inut presure2 入口压力2 MPa
                    paflpa1:String, //presure after first level presure ajustment 一级调压后压力1 Bar
                    paflpa2:String, //presure after first level presure ajustment 一级调压后压力2 Bar
                    taflpa1:String, //temperature after first level presure ajustment 一级调压后温度1 ℃
                    taflpa2:String, //temperature after first level presure ajustment 一级调压后温度2 ℃
                    cngType:Number, //0,2
                    //cng 0 only
                    outputP1:String, //output presure1 一号出口压力 Bar
                    outputP2:String, //output presure2 二号出口压力 Bar
                    //cng 2 only
                    hxt1:String, //#1 Heat exchanger temperature一号换热器温度 ℃
                    hxt2:String, //#2 Heat exchanger temperature一号换热器温度 ℃



                    //lng
                    tankp:String, //tankpresure 储罐压力 Bar
                    azip:String, //ajustment zone input presure 调压区入口压力 Bar
                    tanklavel:String, //(remaining amount) 储罐液位 %


                    //both lng and cng
                    outputP:String, //output presure 出口压力 KPa
                    fmot:String, //flowmeter ouput temperature 流量计出口温度 ℃
                    instfow:String, //instantaneous flow 瞬时流量 Nm3/h
                    cumfow:String //cummulative flow 累计流量 Nm3 -- raw val*10

              });

    iPlcSchema.methods.setOwner = function (user, cb) {
        this.oID = user.oID;
        this.cuID = user.an||'system';
        this.muID = user.an||'system';
        cb(null, this);
    };



module.exports = mongoose.model('iplc',iPlcSchema);
