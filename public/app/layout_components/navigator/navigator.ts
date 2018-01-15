import { Component, Input, AfterViewInit } from '@angular/core';
// import {CORE_DIRECTIVES} from '@angular/common';
import { RouterLink } from '@angular/router';
import { config } from '../../config'
import { UserService } from '../../services/user.service';
import { routerNavService } from '../../services/routerNav.service';


declare var jQuery: any;

@Component({
  selector: 'navigator',
  templateUrl: config.prefix + 'layout_components/navigator/navigator.html',
  // directives: [RouterLink, ROUTER_DIRECTIVES,CORE_DIRECTIVES],
  styleUrls: [config.prefix + 'layout_components/navigator/resources/css/style.css']
})

export class Navigator implements AfterViewInit {
  navigations: any[];
  user: any;

  constructor(
    private localUserService: UserService,
    private routerNavServ: routerNavService
  ) {
    this.user = this.localUserService.getUser();
    if (this.user.ap == 1) {
      this.navigations = [
        { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', module: 'home', class: 'home-icon' },
        { link: ['/admin/monitor/gas'], title: '实时监控', icon: 'dist/images/monitor.png', module: 'monitor', class: 'monitor-icon' },
        { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', module: 'gps', class: 'gps-icon' },
        { link: ['/admin/settings/auth'], title: '设置 ', icon: 'dist/images/settings.png', module: 'settings', class: 'settings-icon' }
      ];
    } else if ((this.user.ap == 2)) {
      this.navigations = [
        { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', module: 'home', class: 'home-icon' },
        { link: ['/admin/monitor/gas'], title: '实时监控', icon: 'dist/images/monitor.png', module: 'monitor', class: 'monitor-icon' },
        { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', module: 'gps', class: 'gps-icon' }
      ]
    } else if ((this.user.ap == 3)) {
      this.navigations = [
        { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', module: 'home', class: 'home-icon' },
        { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', module: 'gps', class: 'gps-icon' }
      ]
    }

  }

  ngAfterViewInit() {
    jQuery('.sidebar-collapse').sideNav();
    console.log('button-collapse');
  }
}
