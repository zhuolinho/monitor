

var gps = {
      timer:20000,  //20 sec min
      stimer:90000,//1.5 min
      ip:'222.66.200.66',
      port:{'5553':{
        user:'4872',
        pwd:'4872.pwd',
        simPlate:{  // 9 cars  not needed
          '13764539180':'沪C5M556',
          '13764639247':'沪C803L2',
          '13764639048':'沪AHM577',
          '13764639052':'沪BZ3255',
          '13764639117':'沪ADQ788',
          '13764639134':'沪DF0870',
          '13764639140':'沪BZ0383',
          '13764639296':'沪AQP206',
          '13764639325':'沪BZ3091'
        }
      },
      '5557':{
        user:'8932',
        pwd:'8932.pwd',
        simPlate:{  //14 cars
          '13472488407':'沪D75208',
          '14721922447':'沪D24801',
          '14721115321':'沪BS8267',
          '18217578247':'沪DG7386',
          '18217578452':'沪DG7355',
          '14721115319':'沪BR8728',
          '18721447205':'沪BS7773',
          '14721114287':'沪BG9861',
          '14721114470':'沪B84488',
          '14721115324':'沪B65312',
          '13482489401':'沪BR7101',
          '13761974728':'沪DE1966',
          '13681905543':'沪D37590',
          '13774343629':'沪GK4546'//new
        }
      }
    }
}

module.exports = gps
