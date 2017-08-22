

import { Component, AfterViewInit } from '@angular/core'
import { config } from '../../config';
import { RouterLink } from '@angular/router';
declare var jQuery: any;


@Component({
  selector: 'monitor',
  templateUrl: config.prefix + '/components/monitor/monitor.component.html'
})

export class Monitor implements AfterViewInit {
  constructor() {
    console.log("Monitor is up");
  }

  ngAfterViewInit() { }
}
