
import {Component, provide} from 'angular2/core';
import {config} from '../../config';
import {Request} from '../../services/request';
import {Router} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'login',
  templateUrl:config.prefix + '/components/login/login.component.html',
  styleUrls:[config.prefix + '/components/login/resources/css/style.css']
})

export class LoginComponent{
    user:any = {username:'', password:''};
    request:Request;
    router:Router;
    constructor(request:Request,router:Router){
        this.request = request;
        this.router = router;
    console.log("login is up and running");

    }

    login(){
      var _this = this;
      this.request.post('users/login',{name:this.user.username, password:this.user.password}).subscribe(response => {
         console.log('got respone---',response);
          _this.router.navigate(['Admin']);

      });
    }
 }
