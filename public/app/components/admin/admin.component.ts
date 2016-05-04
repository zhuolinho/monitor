
import {Component ,Inject, Injectable, provide, OnInit} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, CanActivate, LocationStrategy, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {RequestService} from '../../services/request.service';
import {UserService} from '../../services/user.service';
import {isLoggedIn} from '../../services/is-logged-in';
import {Header} from '../../layout_components/header/header';
import {Navigator} from '../../layout_components/navigator/navigator';
import {Sidebar} from '../../layout_components/sidebar/sidebar';
import {Footer} from '../../layout_components/footer/footer';
import {Action} from '../../layout_components/action/action';
import {Home} from '../home/home.component';
import {Monitor} from '../monitor/monitor.component';
import {Gps} from '../gps/gps.component';
import {config} from '../../config';
import {Settings} from '../settings/settings.component';



declare var jQuery:any;

@Component({
  selector:'admin',
  templateUrl: config.prefix+'components/admin/admin.component.html',
  directives: [ROUTER_DIRECTIVES,
    Header,
     Navigator,
     CORE_DIRECTIVES, RouterLink]
})

@CanActivate((to, from) => {
  return isLoggedIn();  //working fine.ignore red line warning
})

@RouteConfig([
  {path:'/home/...', component:Home, name:'Home', useAsDefault:true},
  {path:'/monitor/...', component:Monitor, name:'Monitor'},
  {path:'/gps/...', component:Gps, name:'Gps'},
  {path:'/settings/...', component:Settings, name:'Settings'}
])

export class AdminComponent{
  constructor(public localUserService:UserService, public router:Router){

    console.log("admin is up and running", this.localUserService.getUser());
  }

  // routerCanActivate(){
  //   console.log("can activate---");
  //   if(!this.localUserService.getUser()){
  //       this.router.navigate(['/Login']);
  //       return false;
  //   }
  //   return true;
  // }
 }
