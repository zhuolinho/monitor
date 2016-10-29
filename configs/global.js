var globalConf = {
              system:{
                an:'0000',
                oID:'0000',
                uID:'0000',
                name:'System'
              },
              orgs:[
                  { name:'test',
                    oID:'10000000001'
                  }
                ],
              sms:{
                apikey:'b63756ad1e4a1c904755745dbff0a30e',
                sms_host:'sms.yunpian.com',
                send_tpl_sms_uri:'/v1/sms/tpl_send.json',
                plc_tpl_id:1614128

              }
            }

module.exports = globalConf;
