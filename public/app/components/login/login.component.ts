
import {Component, provide} from 'angular2/core';
import {config} from '../../config';
import {UserService} from '../../services/user.service';
import {Router, CanActivate} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'login',
  templateUrl:config.prefix + '/components/login/login.component.html',
  styleUrls:[config.prefix + '/components/login/resources/css/style.css']
})

export class LoginComponent{

    user:any = {username:'', password:''};
    router:Router;
    constructor(public localUserService:UserService,router:Router){
        this.router = router;
        console.log("login is up and running");
    }

    login(){
      var _this = this;
      console.log("this.user.password---",this.user);
      this.localUserService.login({username:this.user.username, password:this.user.password}).subscribe(res => {
        if(!res.er){
            _this.localUserService.saveUser(res.pl);
          _this.router.navigate(['Admin']);
        }
      });
    }
 }
