
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
import {RequestService} from '../../../../services/request.service';
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


    constructor(
      public request:RequestService
    ){
      console.log("add user modal is up and running>>---");
    }

    addNewUser(){
      console.log("posting ----",this.newUser);
        this.request.post('/users/signup',this.newUser).subscribe(res => {
            console.log("user added-----", res);
        });
    }

    vePrivilegeSelected(event, compRef){

      compRef.newUser.ap = parseInt(event.target.value);
      console.log("event.target.value;----",  compRef.newUser.ap );
    }


    initSelect(){
      var _this = this;

      setTimeout(_=>{
           jQuery('select').material_select();

           jQuery('select').on('change',function(event){
             _this.vePrivilegeSelected(event, _this)
           });
      });

    }
 }
