
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
import {RequestService} from '../../../../services/request.service';
import {SettingsService} from '../../../../services/settings.service';
declare var jQuery:any;

@Component({
  selector:'settings-add-user',
  templateUrl:config.prefix + '/components/settings/access/partials/settings-add-user.component.html'
})

export class SettingsAddUser{
     data:any;
     newUser:any = {
       name:"",
       phone:"",
       pw:"",
       addr:"",
       ap:"",
       sex:""
     };

    @Input('data')
    set users(data){
      this.data = data;
    }



    get users(){return this.data;}

    editMode:boolean = false;
    editTarget:any;


    constructor(private request:RequestService,
                private settingsSrvc:SettingsService){
            console.log("add user modal is up and running>>---");
            this.initUi();
    }

    addNewUser(){

      this.newUser.ap = this.data.users.type.id;
      console.log("posting ----",this.newUser);

        this.request.post('/users/signup',this.newUser).subscribe(res => {
            console.log("sub comp user added-----", res);
            if(res.pl && res.pl.user){
                this.settingsSrvc.addUser(res.pl.user);
                jQuery("#"+this.data.id).closeModal();
            }
        });
    }

    updateUser(){
      console.log("posting ----",this.editTarget);
      this.request.put('/users/update',this.editTarget).subscribe(res => {
          console.log("user added-----", res);
          if(res.pl && res.pl.user){
              this.settingsSrvc.updateUser(res.pl.user);
             jQuery("#"+this.data.id).closeModal();
          }

      });
    }

    // vePrivilegeSelected(event, compRef){
    //   compRef.newUser.ap = parseInt(event.target.value);
    // }

    veSelectGender(event){
        console.log("value-----",event);
    }

    validateForm(){

      setTimeout(_=>{
        console.log("validating----")
        jQuery("#addNewUserModal").validate({
                      rules: {
                          name:"required",
                          phone: {
                              required: true,
                              minlength: 11
                          },
                          password: {
                            required: true,
                            minlength: 6
                          }
                        },

                      //For custom messages
                      messages: {
                          name:"safort",

                          phone:{
                              required: "safort",
                              minlength:"too short"
                          }
                          // phone:{
                          //     required: "必填",
                          //     minlength:"太短了"
                          // },
                          // password: {
                          //   required: "必填",
                          //   minlength: "请输入6个字以上"
                          // }
                      },
                      errorElement : 'div',
                      errorPlacement: function(error, element) {
                        var placement = jQuery(element).data('error');
                        if (placement) {
                          jQuery(placement).append(error)
                        } else {
                          error.insertAfter(element);
                        }
                      }
               });

               jQuery.validator.setDefaults({
                      ignore: []
                });

      },1000);
    }


    initUi(){
      var _this = this;
      setTimeout(_=>{
          //  jQuery('select.privilege').on('change',function(event){
          //    _this.vePrivilegeSelected(event, _this)
          //  });

           _this.validateForm();
      });

    }
 }
