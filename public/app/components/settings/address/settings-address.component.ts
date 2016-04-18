import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsAddAddressUser} from './partials/settings-add-address-user.component';
declare var jQuery:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/address/settings-address.component.html',
  directives:[SettingsAddAddressUser]
})



export class SettingsAddress{
  addressArray = [
      {
          type: { id: 1, value: 'CNG' },
          data: [
              {
                  code: 'C001',
                  addr: '闸北区天目东路111号XX站',
                  plcaddr: '192.167.0.1'
              },
              {
                  code: 'C002',
                  addr: '闸北区天目东路111号XXX站',
                  plcaddr: '192.167.1.2'
              },
              {
                  code: 'C003',
                  addr: '闸北区天目东路111号XX站',
                  plcaddr: '192.167.1.3'
              }
          ]
      },
      {
          type: { id: 2, value: 'LNG' },
          data: [
              {
                  code: 'L001',
                  addr: '闸北区沪太路111号XX站',
                  plcaddr: '192.167.1.8'
              },
              {
                  code: 'L002',
                  addr: '闸北区沪太路121号XXXX站',
                  plcaddr: '192.167.1.2'
              },
              {
                  code: 'L003',
                  addr: '闸北区沪太路222号XXX站',
                  plcaddr: '192.167.0.3'
              }
          ]
      },
      {
          type: { id: 3, value: '管网' },
          data: [
              {
                  code: 'G001',
                  addr: '闸北区新闸路55号XX站',
                  plcaddr: '192.167.1.8'
              },
              {
                  code: 'G002',
                  addr: '闸北区新闸路980号XXXX站',
                  plcaddr: '192.167.1.2'
              },
              {
                  code: 'G003',
                  addr: '闸北区新闸路201号XX站',
                  plcaddr: '192.167.0.3'
              }
          ]
      }
  ];
  staffArray = [
      {
          type: { id: 1, value: '司机' },
          data: [
              {
                  an: '601',
                  name: '刘强',
                  addr: '----',
                  phone: '13987226225',
                  ap: '1******6',
                  p: '1' //permission
              },
              {
                  an: '602',
                  name: '徐某某',
                  addr: '----',
                  phone: '18987226225',
                  ap: '1******6',
                  p: '1' //permission
              },
              {
                  an: '603',
                  name: '高阳',
                  addr: '----',
                  phone: '17987226228',
                  ap: '1******6',
                  p: '1' //permission
              },
              {
                  an: '604',
                  name: '高琳',
                  addr: '----',
                  phone: '13987226228',
                  ap: '1******6',
                  p: '1' //permission
              }
          ]
      },
      {
          type: { id: 2, value: '押运员' },
          data: [
              {
                  an: '801',
                  name: '徐国龙',
                  addr: '----',
                  phone: '13987226223',
                  ap: '1******6',
                  p: '2' //permission
              },
              {
                  an: '802',
                  name: '宋红',
                  addr: '----',
                  phone: '14987226225',
                  ap: '1******6',
                  p: '2' //permission
              },
              {
                  an: '803',
                  name: '高阳',
                  addr: '----',
                  phone: '17987226228',
                  ap: '1******6',
                  p: '2' //permission
              },
              {
                  an: '804',
                  name: '梁凯',
                  addr: '----',
                  phone: '1392226228',
                  ap: '1******6',
                  p: '2' //permission
              }
          ]
      }
  ];

  currentSort = 'all';
  currentSubSort = 'all';
  selectedtab = 1;
  selectedsubtab = 0;


    constructor(){
      console.log("SettingsAddress is up and running");
      this.initUi();
    }



     veSortByAddress(){
        if (this.currentSort != '1') {
            this.currentSort = '1';
        }
        this.currentSubSort = 'all';
        this.selectedsubtab = 0;
        this.initUi();
    };
     veSortByStaff (){
        if (this.currentSort != '2') {
            this.currentSort = '2';
        }
        this.currentSubSort = 'all';
        this.selectedsubtab = 0;
        this.initUi();
    };
     veSortByCng (){
        if (this.currentSubSort != '1') {
            this.currentSubSort = '1';
        }
    };
     veSortByLng (){
        if (this.currentSubSort != '2') {
            this.currentSubSort = '2';
        }

          this.initUi();
    };
     veSortByWebsite (){
        if (this.currentSubSort != '3') {
            this.currentSubSort = '3';
        }
          this.initUi();
    };
     veSortByGuard  (){
        if (this.currentSubSort != '1') {
            this.currentSubSort = '1';
        }
          this.initUi();
    };
     veSortByDriver (){
        if (this.currentSubSort != '2') {
            this.currentSubSort = '2';
        }
          this.initUi();
    };

    initUi (){
        var _this = this;
        setTimeout(function (_) {
            jQuery('.modal-trigger').leanModal({
                dismissible: true,
                opacity: .5,
                in_duration: 300,
                out_duration: 200,
                ready: function () { console.log('Ready'); _this.initSelect(); },
                complete: function () { console.log('Closed'); } // Callback for Modal close
            });
            jQuery('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    };

   initSelect() {
        setTimeout(function (_) {
            jQuery('select').material_select();
        });
    };
}
