import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsAddUser} from './partials/settings-add-user.component';
import {hasSettingsAcess} from '../../../services/has-settings-access';
import {CanActivate} from 'angular2/router';
import {RequestService} from '../../../services/request.service';
import {SettingsService} from '../../../services/settings.service';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'settings-access',
  templateUrl:config.prefix + '/components/settings/access/settings-access.component.html',
  directives:[SettingsAddUser]
})


@CanActivate((to, from) => {
  return hasSettingsAcess();  //working fine.ignore red line warning
})

export class SettingsAccess{

  // userArray:any[] = [
  //           {
  //             type:{id:1,value:'管理层'}, // 管理层
  //             data:[
  //               {
  //                 an:'101',  //account number
  //                 name: '胡某某',
  //                 addr:'----',
  //                 phone:'13987226225',
  //                 ap:'1******6',  // account password
  //                 p:'1', //permission
  //                 sex:0
  //               },
  //               {
  //                 an:'102',  //account number
  //                 name: '徐某某',
  //                 addr:'----',
  //                 phone:'18987226225',
  //                 ap:'1******6',  // account password
  //                 p:'1', //permission
  //                 sex:1
  //               },
  //               {
  //                 an:'103',  //account number
  //                 name: '高阳',
  //                 addr:'----',
  //                 phone:'17987226228',
  //                 ap:'1******6',  // account password
  //                 p:'1', //permission
  //                 sex:0
  //               },
  //               {
  //                 an:'104',  //account number
  //                 name: '高琳',
  //                 addr:'----',
  //                 phone:'13987226228',
  //                 ap:'1******6',  // account password
  //                 p:'1', //permission
  //                 sex:1
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:2,value:'监管员'},
  //             data:[
  //               {
  //                 an:'201',  //account number
  //                 name: '韩丽',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'202',  //account number
  //                 name: '宋红',
  //                 addr:'----',
  //                 phone:'14987226225',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'203',  //account number
  //                 name: '高阳',
  //                 addr:'----',
  //                 phone:'17987226228',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'204',  //account number
  //                 name: '梁凯',
  //                 addr:'----',
  //                 phone:'1392226228',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:3,value:'调度员'},
  //             data:[
  //               {
  //                 an:'301',  //account number
  //                 name: '赵敏',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'3' //permission
  //               },
  //               {
  //                 an:'302',  //account number
  //                 name: '孔德',
  //                 addr:'----',
  //                 phone:'13987226225',
  //                 ap:'1******6',  // account password
  //                 p:'3' //permission
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:4,value:'客户'},
  //             data:[
  //               {
  //                 an:'401',  //account number
  //                 name: 'Candy',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               },
  //               {
  //                 an:'402',  //account number
  //                 name: '周璐',
  //                 addr:'----',
  //                 phone:'18987226003',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               },
  //               {
  //                 an:'403',  //account number
  //                 name: '黄金红',
  //                 addr:'----',
  //                 phone:'13937722609',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               }
  //             ]
  //           }
  //
  // ];
    userArray:any[] = [];
    currentSort:any = 'all';
    selectedtab:number = 0;
    users:any[];

    constructor(private request:RequestService, private settingsSrvc:SettingsService){
      var self = this;
      console.log("SettingsAccess is up and running");
      this.request.get("/users/access").subscribe(res => {
          console.log("got response--",res);
          if(res.pl && res.pl.users){
              this.users = res.pl.users;
          }

          console.log("got users--",this.users);


         var groupUsersObj =  _.groupBy(this.users,'ap');

        [1,2,3,4].forEach(function(key){
           if(config.usersPrivileges[key+'']){
             var group = {type:{id:key,value:config.usersPrivileges[key+'']},data:groupUsersObj[key]||[]};
             self.userArray.push(group);
           }

         });

         this.settingsSrvc.newUserAdded$.subscribe(newUser => {
            console.log("here is the new user----", newUser);
            var correspondingGroup =  _.find(self.userArray,function(o){
                return o.type.id == newUser.ap;
              });

            if(correspondingGroup){
              correspondingGroup.data.unshift(newUser);
              self.initModal();
            }
         });


         this.settingsSrvc.userUpdated$.subscribe(user => {
            console.log("here is the updated user----", user);
         });
        this.initUi();

          // console.log("key by", self.userArray)
      });
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
