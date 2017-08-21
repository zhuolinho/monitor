
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
    console.log("gas-stats is up and running----->>>>---");

    this.showAllPlc();
    // this.request.get('/plc/latest/withaddress.json').subscribe(resp => {
    //   console.log("latest plc>>>-----", resp);
    //   if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
    //     this.realTimeData = resp.pl.plc;
    //     this.plcAddresses = _.keyBy(resp.pl.address, 'tank');
    //     this.connectedPlcs = _.orderBy(Object.keys(this.realTimeData), (o) => {
    //       return parseInt(o.slice(1, 4));
    //     }, ['asc']);
    //     this.currentPlcTank = this.connectedPlcs[0];
    //   }
    // });
  }
  ngOnInit() {
    this.showAllPlc();
  }

  showAllPlc() {
    this.request.get('/plc/connected/get-all.json')
      .subscribe(res => {
        let list = {};
        res.pl.address.forEach(function (obj){
          list[obj.tank] = obj;
        });
        console.log(list);
        this.realTimeData = res.pl.plc.map(obj => {obj.addr = list[obj.tank].addr});
      });
  }
}
