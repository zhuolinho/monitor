import {Component} from '@angular/core';
import {config} from '../../../config';
// import {SettingsAddAddress} from './partials/settings-add-address.component';
// import {hasSettingsAcess} from '../../../services/has-settings-access';
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

  currentSort = 'all';
  selectedtab = 1;
  addresses:any;
  indexedAddresses:any={};
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

  editMode:boolean = false;
  editTarget:any;
  plcAddrTanks:any[] = [];
  targetTanks:any[] = [];
  newAddress:any = new plcAddress();

    constructor( private request:RequestService){

      console.log("SettingsAddress is up and running");
      var self = this;

      this.request.get("/plc/address/all.json").subscribe(res => {
          console.log("got response--",res);
            if(res.pl && res.pl.address){
              this.addresses = res.pl.address;
              this.indexedAddresses = _.keyBy(this.addresses,function(o){
                  return o.tank;
              })
          }

          console.log("this.indexedAddresses ------",this.indexedAddresses );

      this._processAddr(this.addresses);
        this.initUi();

          // console.log("key by", self.userArray)
      });


      this.request.get('/plc/latest.json').subscribe(resp => {
        console.log("latest plc-----",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.plcAddrTanks = _.map(resp.pl.plc,function(plc){
               return plc;
            });
            this.targetTanks = this.plcAddrTanks;
          console.log('got this.plcAddrTanks ',this.plcAddrTanks);
        }
      });

    }

  _processAddr(addr){

    var that = this;
    var groupAddressesObj =  _.groupBy(addr,'at');

      console.log("groupaddressesObj--",groupAddressesObj);
     config.addresses.forEach(function(key,index){  //set type and data for each group of addresses
          var group = {type:{id:index+1,value:key},data:groupAddressesObj[key.en]||[]};
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
     console.log("selected item----",arg,this.plcAddrTanks);
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
       this.newAddress = new plcAddress();
       this.newAddress.at = arg.addressType.en;
       this.targetTanks = [];
       for (let i = 0; i < this.plcAddrTanks.length; i++) {  //take only corresping type tanks
           if (this.plcAddrTanks[i].plcType == arg.addressType.en){
                  if (!this.indexedAddresses[this.plcAddrTanks[i].tank]){ // show only tanks that don t have addesses yet
                      this.targetTanks.push(this.plcAddrTanks[i]);
                  }

           };
       }

       jQuery('select#plcAddrTank').val(null);
       jQuery('select#plcAddrTank').attr('disabled',null);
     }

    this.addressType = arg.addressType.cn;

     console.log("this.addressType ----",this.addressType );
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
                      return addrGrp.type.value.en == res.pl.address.at;
                  });
                  addrGroup.data.unshift(res.pl.address);
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
              // if(res.pl && res.pl.address){
              //     this.settingsSrvc.updateAddress(res.pl.address);
              // }
              // else{
              //   alert("系统错误!");
              // }
          });
        }



        veSelecedPlcTank(event, compRef){
          if(event && event.target && event.target.value){
              compRef.newAddress.tank = event.target.value;
          }
          compRef.initSelect();
        }
}






export class plcAddress  {
  code:string;
  cn:string;
  addr:string;
  at:string;
  plcip1:string;
  plcip2:string;
  tank:string;
  constructor(){

      this.code='';
      this.cn='';
      this.addr='';
      this.at='';
      this.plcip1='';
      this.plcip2='';
      this.tank='';
  }
};
