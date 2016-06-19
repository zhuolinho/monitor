import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsAddAddress} from './partials/settings-add-address.component';
import {hasSettingsAcess} from '../../../services/has-settings-access';
import {SettingsService} from '../../../services/settings.service';
import {RequestService} from '../../../services/request.service';
import {CanActivate} from 'angular2/router';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/address/settings-address.component.html',
  directives:[SettingsAddAddress]
})

@CanActivate((to, from) => {
  return hasSettingsAcess();  //working fine.ignore red line warning
})


export class SettingsAddress{
  // tanksArray = [
  //     {
  //         type: { id: 1, value: 'CNG' },
  //         data: [
  //             {
  //                 code: 'C001',
  //                 addr: '闸北区天目东路111号XX站',
  //                 plcaddr: '192.167.0.1'
  //             },
  //             {
  //                 code: 'C002',
  //                 addr: '闸北区天目东路112号XXX站',
  //                 plcaddr: '192.167.1.2'
  //             },
  //             {
  //                 code: 'C003',
  //                 addr: '闸北区天目东路114号XX站',
  //                 plcaddr: '192.167.1.3'
  //             }
  //         ]
  //     },
  //     {
  //         type: { id: 2, value: 'LNG' },
  //         data: [
  //             {
  //                 code: 'L001',
  //                 addr: '闸北区沪太路113号XX站',
  //                 plcaddr: '192.167.1.8'
  //             },
  //             {
  //                 code: 'L002',
  //                 addr: '闸北区沪太路121号XXXX站',
  //                 plcaddr: '192.167.1.2'
  //             },
  //             {
  //                 code: 'L003',
  //                 addr: '闸北区沪太路220号XXX站',
  //                 plcaddr: '192.167.0.3'
  //             }
  //         ]
  //     },
  //     {
  //         type: { id: 3, value: '集格' },
  //         data: [
  //             {
  //                 code: 'J001',
  //                 addr: '闸北区新闸路55号XX站',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: 'J002',
  //                 addr: '闸北区新闸路980号XXXX站',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: 'J003',
  //                 addr: '闸北区新闸路201号XX站',
  //                 plcaddr: ''
  //             }
  //         ]
  //     },
  //
  //     {
  //         type: { id: 4, value: '杜瓦瓶' },
  //         data: [
  //             {
  //                 code: 'D011',
  //                 addr: '闸北区新闸路77号XX站',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: 'D022',
  //                 addr: '闸北区新闸路180号XXXX站',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: 'D013',
  //                 addr: '闸北区新闸路331号XX站',
  //                 plcaddr: ''
  //             }
  //         ]
  //     },
  //     {
  //         type: { id: 5, value: '管网' },
  //         data: [
  //             {
  //                 code: 'G001',
  //                 addr: '闸北区新闸路55号XX站',
  //                 plcaddr: '192.167.1.8'
  //             },
  //             {
  //                 code: 'G002',
  //                 addr: '闸北区新闸路980号XXXX站',
  //                 plcaddr: '192.167.1.2'
  //             },
  //             {
  //                 code: 'G003',
  //                 addr: '闸北区新闸路201号XX站',
  //                 plcaddr: '192.167.0.3'
  //             }
  //         ]
  //     },
  //     {
  //         type: { id: 6, value: '中转站' },
  //         data: [
  //             {
  //                 code: '总公司',
  //                 addr: '闸北区新闸路55号XX站',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: '中转站1号',
  //                 addr: '闸北区新闸路180号',
  //                 plcaddr: ''
  //             },
  //             {
  //                 code: '中转站2号',
  //                 addr: '闸北区新闸路801号',
  //                 plcaddr: ''
  //             }
  //         ]
  //     }
  // ];

  currentSort = 'all';
  selectedtab = 1;
  tanks:any;
  tanksArray:any[] = [];

    constructor(private settingsSrvc:SettingsService, private request:RequestService){

      console.log("SettingsAddress is up and running");
      var self = this;

      this.request.get("/plc/tanks/all.json").subscribe(res => {
          console.log("got response--",res);
          if(res.pl && res.pl.tanks){
              this.tanks = res.pl.tanks;
          }

          console.log("got tanks--",this.tanks);


         var groupTanksObj =  _.groupBy(this.tanks,function(tank){
            return tank.code[0];
         });

         console.log("groupTanksObj--",groupTanksObj);
        config.tanks.forEach(function(key,index){
             var group = {type:{id:index+1,value:key},data:groupTanksObj[key[0]]||[]};
             self.tanksArray.push(group);
         });

         this.settingsSrvc.newTankAdded$.subscribe(newTank => {
            console.log("here is the new newTank----", newTank);
            var correspondingGroup =  _.find(self.tanksArray,function(o){
                return o.type.value[0] == newTank.code[0];
              });

            if(correspondingGroup){
              correspondingGroup.data.unshift(newTank);
              self.initModal();
            }
         });


         this.settingsSrvc.tankUpdated$.subscribe(tank => {
            console.log("here is the updated tank----", tank);
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
