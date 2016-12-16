var plc = {
  shipable:['余量报警','拉回报警','进场报警'],
  timer:20000,  //20 sec min
  cumFlowCoef:10,
  // stimer:90000,//1.5 min
  sTimer:5*60000, //5min.
  start:'abegin',
  end:'aend',
  plcTypeByPrefix:{
    "C":"CNG",
    "L":"LNG",
    "G":"Guanwang"
  }
}


module.exports = plc;
