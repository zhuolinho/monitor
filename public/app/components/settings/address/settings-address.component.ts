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
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
}
