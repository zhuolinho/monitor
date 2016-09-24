import {appInjector} from './app-injector';
import {UserService} from './user.service';
import {Router} from '@angular/router';

export const isLoggedIn = (to, from) => {
	let injector = appInjector();
	let userServc = injector.get(UserService);
	let router = injector.get(Router);
  if(userServc.getUser()){
    return true;
  }
  else{
    router.navigate(['/Login']);
    return false;
  }
};
