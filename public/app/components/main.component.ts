
import {Component ,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy,AsyncRoute, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {RequestService} from '../services/request.service';
import {UserService} from '../services/user.service';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {config} from '../config';



declare var jQuery:any;

@Component({
  selector:'main',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
     providers: []  //providers were moved to the boot due to login redirect CanActivate implementation
})

@RouteConfig([
  {path:'/', component:LoginComponent, name:'Login'},
  {path:'/admin/...', component:AdminComponent, name:'Admin'}
])

export class MainComponent {
  constructor(){
  console.log("MainComponent is up and running");
  }
 }
