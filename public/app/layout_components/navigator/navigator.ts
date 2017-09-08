import { Component, Input, AfterViewInit } from '@angular/core';
// import {CORE_DIRECTIVES} from '@angular/common';
import { RouterLink } from '@angular/router';
import { config } from '../../config'
import { UserService } from '../../services/user.service';

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

  constructor(private localUserService: UserService) {
    this.user = this.localUserService.getUser();
    if (this.user.ap == 1) {
      this.navigations = [
        { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', class: 'home-icon' },
        { link: ['/admin/monitor/gas'], title: '实时监控', icon: 'dist/images/monitor.png', class: 'monitor-icon' },
        { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', class: 'gps-icon' },
        { link: ['/admin/settings/auth'], title: '设置 ', icon: 'dist/images/settings.png', class: 'settings-icon' }
      ];
    } else {
      this.navigations = [
        { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', class: 'home-icon' },
        { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', class: 'gps-icon' }
      ]
    }

  }

  ngAfterViewInit() {
    jQuery('.sidebar-collapse').sideNav();
    console.log('button-collapse');
  }
}
