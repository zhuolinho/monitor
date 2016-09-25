import {Component} from '@angular/core';
import {config} from '../../../config';
// import {SettingsAddSmsUser} from './partials/settings-add-sms-user.component';
// import {hasSettingsAcess} from '../../../services/has-settings-access';
import {CanActivate} from '@angular/router';

declare var jQuery:any;

@Component({
  selector:'settings-sms',
  templateUrl:config.prefix + '/components/settings/sms/settings-sms.component.html',
  // directives:[SettingsAddSmsUser]
})

// @CanActivate((to, from) => {
//   return hasSettingsAcess();  //working fine.ignore red line warning
// })

export class SettingsSms{

        userArray:any[] = [
                  {
                    type:{id:1,value:'报警短信'},
                    data:[
                      {
                        an:'101',  //account number
                        name: '胡某某',
                        addr:'----',
                        phone:'13987226225',
                        ap:'1******6',  // account password
                        p:'1' //permission
                      },
                      {
                        an:'102',  //account number
                        name: '徐某某',
                        addr:'----',
                        phone:'18987226225',
                        ap:'1******6',  // account password
                        p:'1' //permission
                      },
                      {
                        an:'103',  //account number
                        name: '高阳',
                        addr:'----',
                        phone:'17987226228',
                        ap:'1******6',  // account password
                        p:'1' //permission
                      },
                      {
                        an:'104',  //account number
                        name: '高琳',
                        addr:'----',
                        phone:'13987226228',
                        ap:'1******6',  // account password
                        p:'1' //permission
                      }
                    ]
                  },
                  {
                    type:{id:2,value:'接警短信'},
                    data:[
                      {
                        an:'201',  //account number
                        name: '韩丽',
                        addr:'----',
                        phone:'13987226223',
                        ap:'1******6',  // account password
                        p:'2' //permission
                      },
                      {
                        an:'202',  //account number
                        name: '宋红',
                        addr:'----',
                        phone:'14987226225',
                        ap:'1******6',  // account password
                        p:'2' //permission
                      },
                      {
                        an:'203',  //account number
                        name: '高阳',
                        addr:'----',
                        phone:'17987226228',
                        ap:'1******6',  // account password
                        p:'2' //permission
                      },
                      {
                        an:'204',  //account number
                        name: '梁凯',
                        addr:'----',
                        phone:'1392226228',
                        ap:'1******6',  // account password
                        p:'2' //permission
                      }
                    ]
                  },
                  {
                    type:{id:3,value:'配送短信'},
                    data:[
                      {
                        an:'301',  //account number
                        name: '赵敏',
                        addr:'----',
                        phone:'13987226223',
                        ap:'1******6',  // account password
                        p:'3' //permission
                      },
                      {
                        an:'302',  //account number
                        name: '孔德',
                        addr:'----',
                        phone:'13987226225',
                        ap:'1******6',  // account password
                        p:'3' //permission
                      }
                    ]
                  },
                  {
                    type:{id:4,value:'到达短信'},
                    data:[
                      {
                        an:'401',  //account number
                        name: 'Candy',
                        addr:'----',
                        phone:'13987226223',
                        ap:'1******6',  // account password
                        p:'4' //permission
                      },
                      {
                        an:'401',  //account number
                        name: '周璐',
                        addr:'----',
                        phone:'18987226003',
                        ap:'1******6',  // account password
                        p:'4' //permission
                      },
                      {
                        an:'401',  //account number
                        name: '黄金红',
                        addr:'----',
                        phone:'13937722609',
                        ap:'1******6',  // account password
                        p:'4' //permission
                      }
                    ]
                  }

        ];

        currentSort:string = 'all';
        selectedtab:number = 0;
        editMode:boolean = false;
        editTarget:any;
        smsType:string;

        constructor(){
          console.log("SettingsSms is up and running");
            this.initUi();
        }



      veSortBy(wich){
        if(this.currentSort!=wich){
          this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
          setTimeout(_=>{
            this.currentSort = wich;
            this.initUi();
          },100);
        }
      }



        showDetailModal(arg){
          console.log("selected item----",arg);
          var that = this;

          if(arg.user){
            this.editMode = true;
            this.editTarget = arg.user;
          }
          else{
            this.editMode = false;
            this.editTarget = null;
          }

          this.smsType = arg.type;

          jQuery("#settingsSmsDetailsModal").openModal({
               ready: function() {
                    that.initSelect();
                }
          });
        }

        closeDetailModal(){
              jQuery("#settingsSmsDetailsModal").closeModal();
        }


        initUi(){

          var _this = this;

            setTimeout(_=>{
                jQuery('.modal-trigger').leanModal({
                     dismissible: true, // Modal can be dismissed by clicking outside of the modal
                     opacity: .5, // Opacity of modal background
                     in_duration: 300, // Transition in duration
                     out_duration: 200, // Transition out duration
                     ready: function() { console.log('Ready');  _this.initSelect()}, // Callback for Modal open
                     complete: function() { console.log('Closed'); } // Callback for Modal close
               });
               jQuery('.collapsible').collapsible({
                 accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
               });
            });
        }

        initSelect(){
          setTimeout(_=>{
               jQuery('select').material_select();
          });
        }



 }
