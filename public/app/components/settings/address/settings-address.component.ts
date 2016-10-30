import {Component} from '@angular/core';
import {config} from '../../../config';
// import {SettingsAddAddress} from './partials/settings-add-address.component';
// import {hasSettingsAcess} from '../../../services/has-settings-access';
import {SettingsService} from '../../../services/settings.service';
import {RequestService} from '../../../services/request.service';
import {CanActivate} from '@angular/router';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/address/settings-address.component.html',
  // directives:[SettingsAddAddress]
})

// @CanActivate((to, from) => {
//   return hasSettingsAcess();  //working fine.ignore red line warning
// })


export class SettingsAddress{




  testPlcs = [
    {
      "_id": "5810d7cfa7d1a71e69621e6b",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:23",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "3",
      "iwc2": "13.8",
      "isc2": "55.1",
      "p2": "398.1",
      "temp2": "17.5",
      "pwc2": "164633.0",
      "psc2": "2522930.0",
      "rsc2": "61.0",
      "cf2": "0",
      "er2": "0",
      "tank": "L001",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6c",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:4:32",
      "addr1": "2",
      "iwc1": "0",
      "isc1": "0",
      "p1": "365.7",
      "temp1": "22.6",
      "pwc1": "346385.0",
      "psc1": "6374181.0",
      "rsc1": "653.0",
      "cf1": "0",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L002",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6d",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:27",
      "addr1": "2",
      "iwc1": "28.2",
      "isc1": "107",
      "p1": "372.0",
      "temp1": "23.2",
      "pwc1": "37889.0",
      "psc1": "1649238.0",
      "rsc1": "0",
      "cf1": "0",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L003",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6e",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-26 11:26:9",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L004",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6f",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:10",
      "addr1": "2",
      "iwc1": "83.5",
      "isc1": "298",
      "p1": "362.9",
      "temp1": "21.1",
      "pwc1": "605653.0",
      "psc1": "12117552.0",
      "rsc1": "545.0",
      "cf1": "0",
      "er1": "0",
      "addr2": "3",
      "iwc2": "0",
      "isc2": "0",
      "p2": "97.9",
      "temp2": "20.3",
      "pwc2": "0",
      "psc2": "141222.0",
      "rsc2": "0",
      "cf2": "0",
      "er2": "0",
      "tank": "L005",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e78",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-26 14:51:52",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L014",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e7b",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:19",
      "addr1": "2",
      "iwc1": "28.0",
      "isc1": "103",
      "p1": "372.6",
      "temp1": "22.9",
      "pwc1": "460190.0",
      "psc1": "7104624.0",
      "rsc1": "0",
      "cf1": "0",
      "er1": "0",
      "addr2": "3",
      "iwc2": "0",
      "isc2": "0",
      "p2": "94.6",
      "temp2": "22.8",
      "pwc2": "22693.0",
      "psc2": "440.0",
      "rsc2": "334.0",
      "cf2": "0",
      "er2": "0",
      "tank": "L017",
      "__v": 0
    }
  ];

  currentSort = 'all';
  selectedtab = 1;
  addresses:any;
  addressArray:any[] = [];





  lngTanks:any[] = [
    'L004','L005','L006','L007'
  ];
  cngTanks:any[] = [
    'C004','C005','C006','C007'
  ];
  jigeTanks:any[] = [
    'J004','J005','J006','J007'
  ];
  duwapingTanks:any[] = [
    'D004','D005','D006','D007'
  ];

  guanwangTanks:any[] = [
    'G004','G005','G006','G007'
  ];
  zhongzhuanTanks:any[] = [
    '中转站3号','中转站4号','中转站5号'
  ];

  addressType:string;

  currentTanks:any[] = [];
  editMode:boolean = false;
  editTarget:any;
  plcAddrTanks:string[] = [];
  newAddress:any = {
    code:'',
    cn:'',
    addr:'',
    at:'',
    plcip1:'',
    plcip2:'',
    tank:''
  };

    constructor(private settingsSrvc:SettingsService, private request:RequestService){

      console.log("SettingsAddress is up and running");
      var self = this;

      this.request.get("/plc/address/all.json").subscribe(res => {
          console.log("got response--",res);
            if(res.pl && res.pl.address){
              this.addresses = res.pl.address;
          }

      this._processAddr(this.addresses);

        //  this.settingsSrvc.newAddressAdded$.subscribe(newAddr => {
        //     console.log("here is the new newAddr----", newAddr);
        //     var correspondingGroup =  _.find(self.addressArray,function(o){
        //         return o.type.value == newAddr.at;
        //       });
         //
        //     if(correspondingGroup){
        //       correspondingGroup.data.unshift(newAddr);
        //       self.initModal();
        //     }
        //  });


        //  this.settingsSrvc.addressUpdated$.subscribe(addr => {
        //     console.log("here is the updated addr----", addr);
        //  });
        this.initUi();

          // console.log("key by", self.userArray)
      });


      this.request.get('/plc/latest.json').subscribe(resp => {
        console.log("latest plc-----",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.plcAddrTanks = _.map(resp.pl.plc,function(plc){
               return plc.tank;
            })
            console.log('got this.plcAddrTanks ',this.plcAddrTanks);
        }
      });

    }

  _processAddr(addr){

    var that = this;

      var groupAddressesObj =  _.groupBy(addr,'at');

      console.log("groupaddressesObj--",groupAddressesObj);
     config.addresses.forEach(function(key,index){
          var group = {type:{id:index+1,value:key},data:groupAddressesObj[key]||[]};
          that.addressArray.push(group);
      });
  }

   veSortBy(which){
     if (this.currentSort != which) {
       this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
       setTimeout(_=>{
            this.currentSort = which
            this.initUi();
       },100);
     }
   }

   showDetailModal(arg){
     console.log("selected item----",arg);
     var that = this;
     if(arg.addr){
       this.editMode = true;
       this.editTarget = arg.addr;
       jQuery('select#plcAddrTank').val(this.editTarget.tank);
       jQuery('select#plcAddrTank').attr('disabled','disabled');
     }
     else{
       this.editMode = false;
       this.editTarget = null;
       this.newAddress.at = arg.addressType;
       jQuery('select#plcAddrTank').val(null);
       jQuery('select#plcAddrTank').attr('disabled',null);
     }
    this.addressType = arg.addressType;
     jQuery("#settinsAddressDetailModal").openModal({
          ready: function() {
               that.initSelect();
           }
     });
   }

   closeDetailModal(){
         jQuery("#settinsAddressDetailModal").closeModal();
   }


    initUi(){
      this.initCollapase();
      this.initModal();

    }
    initCollapase(){
      setTimeout(_=>{
          jQuery('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
          });
      });
    }

    initModal(){
        var that = this;
        setTimeout(_=>{
            jQuery('.modal-trigger').leanModal({
                 dismissible: true, // Modal can be dismissed by clicking outside of the modal
                 opacity: .5, // Opacity of modal background
                 in_duration: 300, // Transition in duration
                 out_duration: 200, // Transition out duration
                 ready: function() { console.log('Ready');  that.initSelect()}, // Callback for Modal open
                 complete: function() { console.log('Closed'); } // Callback for Modal close
           });
        });
    }

    initSelect(){

      var that = this;
      setTimeout(_=>{
           jQuery('select').material_select();

           jQuery('select#plcAddrTank').on('change',function(event){
             that.veSelecedPlcTank(event, that);
           });

           jQuery('select#plcip1').on('change',function(event){
             that.veSelecedplcip1(event, that);
           });


           jQuery('select#plcip2').on('change',function(event){
             that.veSelecedplcip2(event, that);
           });
      });
    }




        addNewAddress(){

          console.log("posting ----",this.newAddress);

          if(this.newAddress.tank){
            this.request.post('/plc/address.json',this.newAddress).subscribe(res => {
                if(res.pl && res.pl.address){
                  console.log('added new addr----',res.pl.address);

                  // var group = {type:{id:index+1,value:key},data:groupAddressesObj[key]||[]};
                  // that.addressArray.push(group);

                  var addrGroup = _.find(this.addressArray,function(addrGrp){
                      return addrGrp.type.value == res.pl.address.at;
                  });
                  addrGroup.data.unshift(res.pl.address);
                    // this.settingsSrvc.addAddress(res.pl.address);
                    jQuery("#settinsAddressDetailModal").closeModal();
                }
                else{
                  alert("系统错误!");
                }
            });
          }
          else{
            alert("请选择plc");
          }


        }

        updateAddress(){
          console.log("posting ----",this.editTarget);
          this.request.put('/plc/address.json',this.editTarget).subscribe(res => {
              console.log("sub comp address updated-----", res);
              this.closeDetailModal();
              if(res.pl && res.pl.address){
                  this.settingsSrvc.updateAddress(res.pl.address);
              }
              else{
                alert("系统错误!");
              }
          });
        }



        veSelecedPlcTank(event, compRef){
          if(event && event.target && event.target.value){
              compRef.newAddress.tank = event.target.value;
          }
          compRef.initSelect();
        }
        veSelecedplcip1(event, compRef){
          if(event && event.target && event.target.value){
            if(!compRef.editTarget){
                  compRef.newAddress.plcip1 = event.target.value;
            }
            else{
                  compRef.editTarget.plcip1 = event.target.value;
            }
          }
          compRef.initSelect();
        }

        veSelecedplcip2(event, compRef){
          if(event && event.target && event.target.value){
            if(!compRef.editTarget){
                  compRef.newAddress.plcip2 = event.target.value;
            }
            else{
                  compRef.editTarget.plcip2 = event.target.value;
            }
            compRef.initSelect();
          }
        }

        setCurrentTanks(addressType){
          switch(addressType){
            case 'CNG':
                    this.currentTanks = this.cngTanks;
                    break;
            case 'LNG':
                    this.currentTanks = this.lngTanks;
                    break;
          case '集格':
                  this.currentTanks = this.jigeTanks;
                  break;
          case '杜瓦瓶':
                  this.currentTanks = this.duwapingTanks;
                  break;
          case '管网':
                  this.currentTanks = this.guanwangTanks;
                  break;

          case '中转站':
                  this.currentTanks = this.zhongzhuanTanks;
                  break;
            default:
                  console.log('default');
          }
        }
}
