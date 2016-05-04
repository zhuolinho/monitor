import {bootstrap}    from 'angular2/platform/browser';
import {MainComponent} from './components/main.component';
import {enableProdMode,provide} from 'angular2/core'
//for CanActivate
import {appInjector} from './services/app-injector';
import {UserService} from './services/user.service';
import {RequestService} from './services/request.service';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS,LocationStrategy, HashLocationStrategy,} from 'angular2/router';


enableProdMode();
bootstrap(MainComponent,[
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  RequestService, UserService
]).then((appRef) => {
  // store a reference to the injector
  appInjector(appRef.injector);
});



//
// bootstrap(App, [
//   Auth,
//   HTTP_PROVIDERS, ROUTER_PROVIDERS,
//   bind(LocationStrategy).toClass(HashLocationStrategy)
// ]).then((appRef) => {
//   // store a reference to the injector
//   appInjector(appRef.injector);
// });
