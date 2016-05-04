import {Injectable} from 'angular2/core'
import  {RequestService} from './request.service';

import 'rxjs/add/operator/map';

var loginApi = 'users/login';

@Injectable()
export class UserService {
  settingsAcces:boolean = false;
  public constructor(public request:RequestService) {

  }

  getUser(){
      return JSON.parse(sessionStorage.getItem('user'));
  }

  getToken(){
        return JSON.parse(sessionStorage.getItem('jwt'));
  }

  login(user){
      return  this.request.post(loginApi,user);
  }

  saveUser(userInfo){
    sessionStorage.setItem('jwt', userInfo.token);
    sessionStorage.setItem('user',JSON.stringify(userInfo.user));
  }


  logedInSettings(){
      sessionStorage.setItem('settingsAccess','true');
  }

  getSettingAcess(){
      return sessionStorage.getItem('settingsAccess');
  }

  logout(){
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("settingsAccess");
  }

  redirectUser(){

  }
}
