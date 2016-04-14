
import {Component ,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {Request} from '../../services/request';
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
import {DynamicRouteConfigurator} from '../../services/router';



declare var jQuery:any;

@Component({
  selector:'admin',
  templateUrl: config.prefix+'components/admin/admin.component.html',
  directives: [ROUTER_DIRECTIVES,
    Header,
     Navigator,
     CORE_DIRECTIVES, RouterLink]
})

@RouteConfig([
  {path:'/home/...', component:Home, name:'Home', useAsDefault:true},
  {path:'/monitor/...', component:Monitor, name:'Monitor'},
  {path:'/gps/...', component:Gps, name:'Gps'},
  {path:'/settings', component:Settings, name:'Settings'}
])

export class AdminComponent {
  constructor(){
    console.log("admin is up and running");
  }
 }
