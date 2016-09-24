import {appInjector} from './app-injector';
import {UserService} from './user.service';
import {Router} from '@angular/router';

export const hasSettingsAcess = (to, from) => {
	let injector = appInjector();
	let userServc = injector.get(UserService);
	let router = injector.get(Router);

  if(userServc.getSettingAcess()){
		return true;
  }
  else{
    router.navigate(['/Admin','Settings']);
    return false;
  }
};
