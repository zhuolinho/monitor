
import {Component ,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy,AsyncRoute, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {Request} from '../services/request';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {config} from '../config';
import {DynamicRouteConfigurator} from '../services/router';



declare var jQuery:any;

@Component({
  selector:'main',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
     providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    Request
  ]
})

@RouteConfig([
  {path:'/', component:LoginComponent, name:'Home'},
  {path:'/admin/...', component:AdminComponent, name:'Admin'}
])

export class MainComponent {
  constructor(){
  console.log("MainComponent is up and running");
  }
 }
