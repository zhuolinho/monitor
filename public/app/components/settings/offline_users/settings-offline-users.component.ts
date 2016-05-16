import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsAddOfflineUser} from './partials/settings-add-offline-user.component';
import {hasSettingsAcess} from '../../../services/has-settings-access';
import {CanActivate} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/offline_users/settings-offline-users.component.html',
  directives:[SettingsAddOfflineUser]
})

@CanActivate((to, from) => {
  return hasSettingsAcess();  //working fine.ignore red line warning
})


export class SettingsOfflineUsers{
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


    constructor(){
      console.log("Settings Offline users is up and running");
      this.initUi();
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
