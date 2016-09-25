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
  newAddress:any = {
    code:'',
    cn:'',
    addr:'',
    at:'',
    plcaddr1:'',
    plcaddr2:''
  };

    constructor(private settingsSrvc:SettingsService, private request:RequestService){

      console.log("SettingsAddress is up and running");
      var self = this;

      this.request.get("/plc/address/all.json").subscribe(res => {
          console.log("got response--",res);
            if(res.pl && res.pl.address){
              this.addresses = res.pl.address;
          }
         var groupAddressesObj =  _.groupBy(this.addresses,'at');

         console.log("groupaddressesObj--",groupAddressesObj);
        config.addresses.forEach(function(key,index){
             var group = {type:{id:index+1,value:key},data:groupAddressesObj[key]||[]};
             self.addressArray.push(group);
         });

         this.settingsSrvc.newAddressAdded$.subscribe(newAddr => {
            console.log("here is the new newAddr----", newAddr);
            var correspondingGroup =  _.find(self.addressArray,function(o){
                return o.type.value == newAddr.at;
              });

            if(correspondingGroup){
              correspondingGroup.data.unshift(newAddr);
              self.initModal();
            }
         });


         this.settingsSrvc.addressUpdated$.subscribe(addr => {
            console.log("here is the updated addr----", addr);
         });
        this.initUi();

          // console.log("key by", self.userArray)
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
     }
     else{
       this.editMode = false;
       this.editTarget = null;
       this.newAddress.at = arg.addressType;
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
           jQuery('select#plcAddr1').on('change',function(event){
             that.veSelecedPlcAddr1(event, that);
           });

           jQuery('select#plcAddr2').on('change',function(event){
             that.veSelecedPlcAddr2(event, that);
           });
      });
    }




        addNewAddress(){

          console.log("posting ----",this.newAddress);

            this.request.post('/plc/address.json',this.newAddress).subscribe(res => {
                console.log("sub comp address added-----", res);
                this.closeDetailModal()
                if(res.pl && res.pl.address){
                    this.settingsSrvc.addAddress(res.pl.address);
                }
                else{
                  alert("系统错误!");
                }
            });
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

        veSelecedPlcAddr1(event, compRef){
          if(event && event.target && event.target.value){
            if(!compRef.editTarget){
                  compRef.newAddress.plcaddr1 = event.target.value;
            }
            else{
                  compRef.editTarget.plcaddr1 = event.target.value;
            }
          }
          compRef.initSelect();
        }

        veSelecedPlcAddr2(event, compRef){
          if(event && event.target && event.target.value){
            if(!compRef.editTarget){
                  compRef.newAddress.plcaddr2 = event.target.value;
            }
            else{
                  compRef.editTarget.plcaddr2 = event.target.value;
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
