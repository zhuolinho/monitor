

import { Component, AfterViewInit } from '@angular/core'
import { config } from '../../config';
import { RouterLink } from '@angular/router';
import { routerNavService } from '../../services/routerNav.service';
declare var jQuery: any;


@Component({
  selector: 'monitor',
  templateUrl: config.prefix + '/components/monitor/monitor.component.html'
})

export class Monitor implements AfterViewInit {
  constructor(private routerNavServ: routerNavService) {
    this.routerNavServ.currentModule = 'monitor';
    console.log("Monitor is up");
  }

  ngAfterViewInit() { }
}
