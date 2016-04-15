import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {Request} from '../../../services/request';
import {Router} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'settings-auth',
  templateUrl:config.prefix + '/components/settings/auth/settings-auth.component.html'
})

export class SettingsAuth{
  user:any = {username:'', password:''};
  request:Request;
  router:Router;

  constructor(request:Request,router:Router){
      this.request = request;
      this.router = router;
      console.log("SettingsAuth is up and running");

  }

    login(){
      var _this = this;
      this.request.post('users/login',{name:this.user.username, password:this.user.password}).subscribe(response => {
         console.log('got respone---',response);
          _this.router.navigate(['SettingsAccess']);

      });
    }
 }
