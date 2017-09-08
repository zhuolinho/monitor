
import { Component } from '@angular/core';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';
// import {LoginComponent} from './login/login.component';
// import {AdminComponent} from './admin/admin.component';
import { config } from '../config';



declare var jQuery: any;


@Component({
  selector: 'main',
  template: '<router-outlet></router-outlet>'
  // directives: [ROUTER_DIRECTIVES,CORE_DIRECTIVES],
})

// @RouteConfig([
//   {path:'/', component:LoginComponent, name:'Login'},
//   {path:'/admin/...', component:AdminComponent, name:'Admin'}
// ])

export class MainComponent {
  constructor() {
    console.log("MainComponent is up and running");
  }
}
