import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsAddAddressUser} from './partials/settings-add-address-user.component';
import {SettingsAddAddress} from './partials/settings-add-address.component';
import {hasSettingsAcess} from '../../../services/has-settings-access';
import {CanActivate} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/address/settings-address.component.html',
  directives:[SettingsAddAddressUser,SettingsAddAddress]
})

@CanActivate((to, from) => {
  return hasSettingsAcess();  //working fine.ignore red line warning
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
                  addr: '闸北区天目东路112号XXX站',
                  plcaddr: '192.167.1.2'
              },
              {
                  code: 'C003',
                  addr: '闸北区天目东路114号XX站',
                  plcaddr: '192.167.1.3'
              }
          ]
      },
      {
          type: { id: 2, value: 'LNG' },
          data: [
              {
                  code: 'L001',
                  addr: '闸北区沪太路113号XX站',
                  plcaddr: '192.167.1.8'
              },
              {
                  code: 'L002',
                  addr: '闸北区沪太路121号XXXX站',
                  plcaddr: '192.167.1.2'
              },
              {
                  code: 'L003',
                  addr: '闸北区沪太路220号XXX站',
                  plcaddr: '192.167.0.3'
              }
          ]
      },
      {
          type: { id: 3, value: '集格' },
          data: [
              {
                  code: 'X001',
                  addr: '闸北区新闸路55号XX站',
                  plcaddr: ''
              },
              {
                  code: 'X002',
                  addr: '闸北区新闸路980号XXXX站',
                  plcaddr: ''
              },
              {
                  code: 'X003',
                  addr: '闸北区新闸路201号XX站',
                  plcaddr: ''
              }
          ]
      },

      {
          type: { id: 4, value: '杜瓦瓶' },
          data: [
              {
                  code: 'X011',
                  addr: '闸北区新闸路77号XX站',
                  plcaddr: ''
              },
              {
                  code: 'X022',
                  addr: '闸北区新闸路180号XXXX站',
                  plcaddr: ''
              },
              {
                  code: 'X013',
                  addr: '闸北区新闸路331号XX站',
                  plcaddr: ''
              }
          ]
      },
      {
          type: { id: 5, value: '管网' },
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
      },
      {
          type: { id: 6, value: '中转站' },
          data: [
              {
                  code: '总公司',
                  addr: '闸北区新闸路55号XX站',
                  plcaddr: ''
              },
              {
                  code: '中转站1号',
                  addr: '闸北区新闸路180号',
                  plcaddr: ''
              },
              {
                  code: '中转站2号',
                  addr: '闸北区新闸路801号',
                  plcaddr: ''
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
  selectedtab = 1;
  selectedsubtab = 0;


    constructor(){
      console.log("Settings Offline users is up and running");
      this.initUi();
    }

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
