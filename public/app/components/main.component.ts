
import {Component ,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy,AsyncRoute, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {Request} from '../services/request';
import {Header} from '../layout_components/header/header';
import {Navigator} from '../layout_components/navigator/navigator';
import {Sidebar} from '../layout_components/sidebar/sidebar';
import {Footer} from '../layout_components/footer/footer';
import {Action} from '../layout_components/action/action';
import {Home} from './home/home.component';
import {Monitor} from './monitor/monitor.component';
import {Gps} from './gps/gps.component';
import {config} from '../config';
import {Settings} from './settings/settings.component';
import {DynamicRouteConfigurator} from '../services/router';



declare var jQuery:any;

@Component({
  selector:'main',
  templateUrl:config.prefix + '/components/main.component.html',
  directives: [ROUTER_DIRECTIVES,
    Header,
     Navigator,
     CORE_DIRECTIVES, RouterLink],
     providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    Request
  ]
})

@RouteConfig([
  {path:'/...', component:Home, name:'Home'},
  {path:'/monitor', component:Monitor, name:'Monitor'},
  {path:'/gps', component:Gps, name:'Gps'},
  {path:'/settings', component:Settings, name:'Settings'}
])

export class MainComponent {
  constructor(){
  console.log("MainComponent is up and running");
  }
 }
