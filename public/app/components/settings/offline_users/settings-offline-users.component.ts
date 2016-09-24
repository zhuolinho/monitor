import {Component} from '@angular/core';
import {config} from '../../../config';
// import {SettingsAddOfflineUser} from './partials/settings-add-offline-user.component';
// import {hasSettingsAcess} from '../../../services/has-settings-access';
// import {CanActivate} from '@angular/router';
import {RequestService} from '../../../services/request.service';
import {SettingsService} from '../../../services/settings.service';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/offline_users/settings-offline-users.component.html',
  // directives:[SettingsAddOfflineUser]
})
//
// @CanActivate((to, from) => {
//   return hasSettingsAcess();  //working fine.ignore red line warning
// })


export class SettingsOfflineUsers{
  // staffArray = [
  //     {
  //         type: { id: 1, value: '司机' },
  //         data: [
  //             {
  //                 an: '601',
  //                 name: '刘强',
  //                 addr: '----',
  //                 phone: '13987226225',
  //                 ap: '1******6',
  //                 p: '1' //permission
  //             },
  //             {
  //                 an: '602',
  //                 name: '徐某某',
  //                 addr: '----',
  //                 phone: '18987226225',
  //                 ap: '1******6',
  //                 p: '1' //permission
  //             },
  //             {
  //                 an: '603',
  //                 name: '高阳',
  //                 addr: '----',
  //                 phone: '17987226228',
  //                 ap: '1******6',
  //                 p: '1' //permission
  //             },
  //             {
  //                 an: '604',
  //                 name: '高琳',
  //                 addr: '----',
  //                 phone: '13987226228',
  //                 ap: '1******6',
  //                 p: '1' //permission
  //             }
  //         ]
  //     },
  //     {
  //         type: { id: 2, value: '押运员' },
  //         data: [
  //             {
  //                 an: '801',
  //                 name: '徐国龙',
  //                 addr: '----',
  //                 phone: '13987226223',
  //                 ap: '1******6',
  //                 p: '2' //permission
  //             },
  //             {
  //                 an: '802',
  //                 name: '宋红',
  //                 addr: '----',
  //                 phone: '14987226225',
  //                 ap: '1******6',
  //                 p: '2' //permission
  //             },
  //             {
  //                 an: '803',
  //                 name: '高阳',
  //                 addr: '----',
  //                 phone: '17987226228',
  //                 ap: '1******6',
  //                 p: '2' //permission
  //             },
  //             {
  //                 an: '804',
  //                 name: '梁凯',
  //                 addr: '----',
  //                 phone: '1392226228',
  //                 ap: '1******6',
  //                 p: '2' //permission
  //             }
  //         ]
  //     }
  // ];

  currentSort = 'all';
  selectedtab = 1;

  staffArray:any[] = [];
  users:any[];

    constructor(private request:RequestService, private settingsSrvc:SettingsService){
      console.log("Settings Offline users is up and running");
      var self = this;
      this.request.get("/users/offline.json").subscribe(res => {
          console.log("got response--",res);
          if(res.pl && res.pl.users){
              this.users = res.pl.users;
          }

          console.log("got users--",this.users);


         var groupUsersObj =  _.groupBy(this.users,'ap');

        [6,8].forEach(function(key){
           if(config.usersPrivileges[key+'']){
             var group = {type:{id:key,value:config.usersPrivileges[key+'']},data:groupUsersObj[key]||[]};
             self.staffArray.push(group);
           }

         });

         this.settingsSrvc.newUserAdded$.subscribe(newUser => {
            console.log("here is the new user----", newUser);
            var correspondingGroup =  _.find(self.staffArray,function(o){
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

          // console.log("key by", self.staffArray)
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
