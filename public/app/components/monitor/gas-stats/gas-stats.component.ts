
import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { LibService } from '../../../services/lib.service';
import { config } from '../../../config';
// import {GasDetail} from './details/gas.detail.component';
import { RTMessagesService } from '../../../services/rt-messages.service';
import { RequestService } from '../../../services/request.service';

declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'gas-stats',
  templateUrl: config.prefix + '/components/monitor/gas-stats/gas-stats.component.html'
})

export class GasStats implements OnInit {
  availableStatsTanks: any[] = [
    { tank: 'G001', addr: '宝山', 'maxVal': '223424', usage: 225552 },
    { tank: 'G011', addr: '闵行', 'maxVal': '22424', usage: 23222 },
    { tank: 'G021', addr: '徐汇', 'maxVal': '3424', usage: 22 },
    { tank: 'G031', addr: '静安', 'maxVal': '22223424', usage: 26782 },
    { tank: 'C041', addr: '黄埔', 'maxVal': '22893424', usage: 232 }
  ]

  realTimeData: any;
  connectedPlcs: any;
  plcAddresses: any;
  currentPlcTank: any;

  constructor(
    private request: RequestService,
    private rtmgs: RTMessagesService,
    private lib: LibService) {
    console.log("gas-stats is up and running fine----->>>>---");

    this.showAllPlc();

  }

  ngOnInit() {
    this.showAllPlc();
  }

  showAllPlc() {
    this.request.get('/plc/connected/get-all.json').subscribe(resp => {
      console.log("latest plc>>>-----", resp);
      if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
        let tempPlcData = _.keyBy(resp.pl.plc, 'tank');
        this.plcAddresses = _.orderBy(resp.pl.address, (o) => {
          if (o.addr) {
            return parseInt(o.addr.slice(0, 3));
          }
          return undefined;
        }, ['asc']);

        // this.plcAddresses = _.keyBy(resp.pl.address, 'tank');

        this.realTimeData = _.forEach(this.plcAddresses, (o) => {
          if (tempPlcData[o.tank]) {
            o = _.assign(o, tempPlcData[o.tank]);
          } else {
            o = _.assign(o, {
              maxVal1: 0,
              maxVal2: 0,
              usage1: 0,
              usage2: 0
            });
          }
        })
        console.log("this.plcAddresses---", this.plcAddresses)
        // this.connectedPlcs = _.orderBy(Object.keys(this.realTimeData), (o) => {
        //   return parseInt(o.slice(1, 4));
        // }, ['asc']);
        // this.currentPlcTank = this.connectedPlcs[0];
      }
    });
  }
}
