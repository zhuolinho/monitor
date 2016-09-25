import {Component} from '@angular/core';
import {config} from '../../../config';
import {RequestService} from '../../../services/request.service';
import {SettingsService} from '../../../services/settings.service';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'settings-access',
  templateUrl:config.prefix + '/components/settings/access/settings-access.component.html',
  // directives:[SettingsAddUser]
})


// @CanActivate((to, from) => {
//   return hasSettingsAcess();  //working fine.ignore red line warning
// })

export class SettingsAccess{

    userArray:any[] = [];
    currentSort:any = 'all';
    selectedtab:number = 0;
    users:any[];
    userCategory:string;


    newUser:any = {
      name:"",
      phone:"",
      pw:"",
      addr:"",
      ap:"",
      sex:""
    };

   editMode:boolean = false;
   editTarget:any;

    constructor(private request:RequestService, private settingsSrvc:SettingsService){
      var self = this;
      console.log("SettingsAccess is up and running");
      this.request.get("/users/access.json").subscribe(res => {
          console.log("got response for users--",res);
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



    showDetailModal(arg){
      console.log("selected itme----",arg);
      var that = this;
      if(arg.user){
        this.editMode = true;
        this.editTarget = arg.user;
        this.userCategory = config.usersPrivileges[this.editTarget.ap];
      }
      else{
        this.editMode = false;
        this.editTarget = null;
        this.newUser.ap = arg.category;
        this.userCategory = config.usersPrivileges[this.newUser.ap];
      }
      jQuery("#settinsAccessDetailModal").openModal({
           ready: function() {
                that.initSelect();
            }
      });
    }

    closeDetailModal(){
          jQuery("#settinsAccessDetailModal").closeModal();
    }




    addNewUser(){
      console.log("posting ----",this.newUser);

        this.request.post('/users/signup.json',this.newUser).subscribe(res => {
            console.log("sub comp user added-----", res);
            if(res.pl && res.pl.user){
                this.settingsSrvc.addUser(res.pl.user);
                this.closeDetailModal();
            }
        });
    }

    updateUser(){
      console.log("posting ----",this.editTarget);
      this.request.put('/users/update.json',this.editTarget).subscribe(res => {
          console.log("user added-----", res);
          if(res.pl && res.pl.user){
              this.settingsSrvc.updateUser(res.pl.user);
                this.closeDetailModal();
          }

      });
    }

    veSelectGender(event){
        console.log("value-----",event);

    }
 }
