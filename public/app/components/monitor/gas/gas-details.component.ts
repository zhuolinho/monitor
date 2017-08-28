
import { Component, AfterViewInit, OnDestroy, OnInit, Input } from '@angular/core';
import { LibService } from '../../../services/lib.service';
import { config } from '../../../config';
// import {GasDetail} from './details/gas.detail.component';
import { RTMessagesService } from '../../../services/rt-messages.service';
import { RequestService } from '../../../services/request.service';

declare var jQuery: any;
declare var _: any;
declare var io: any;
declare var d3: any;
declare var c3: any;

@Component({
  selector: 'gas-details',
  templateUrl: config.prefix + '/components/monitor/gas/gas-details.component.html'
  // directives:[GasDetail]
})

export class GasDetails implements AfterViewInit, OnDestroy, OnInit {

  @Input() currentPlcTank: string;
  @Input() isShowByDay: boolean = true;
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [];
  startDays: number[] = [];
  endDays: number[] = [];
  selectedtab: number;  //to switch tabs, the rest is controlled on the page
  currentTable: any;
  detailmodal: any = {};
  goodConnection: boolean = false;
  currentSelect: number[];
  dateTimer: any;
  dataTimer: number = 300000;
  lastDataTime: number = 0;
  currentPlcMetter: string = '1';
  chartData: any = [];
  checkInterruptionTimer: any;
  static graphIsRunning: boolean = false;
  gotTableData: boolean = false;

  realTimeData: any = {};
  connectedPlcs: string[] = [];
  date: any;

  statsStartDate: any;
  statsEndDate: any;
  statsData: any[];
  selectedDownloadTab: number = 1;

  constructor(
    private request: RequestService,
    private rtmgs: RTMessagesService,
    private lib: LibService) {
    console.log("gas is up and running--->>>>");

    // realTimeData
    this.date = lib.dateTime();
    this.setYears(null);
  }

  ngOnInit() {
    this.setStatsInitValues();
    if (this.isShowByDay) {
      this.showByDay(true);
      this.selectedtab = 1;
    } else {
      this.selectedtab = 2;
      this.showByMonth(true);
    }
  }

  ngAfterViewInit() {
    this.updateTime();
  }

  ngOnDestroy() {
    clearInterval(this.dateTimer);
    // clearInterval(this.checkInterruptionTimer);
    GasDetails.graphIsRunning = false;
  }

  // code for detail modal
  showByDay(fromModal) {
    // alert('by day');
    console.log("by day");
    if (fromModal) {
      this.initChart();
    }

    this.isShowByDay = true;
    this.computeStats();
  }

  showByMonth(fromModal) {
    // alert('by month');
    console.log("by month");

    if (fromModal) {
      this.initChart();
    }
    this.isShowByDay = false;

    // re-initialize material-select
    // this.currentSelect = this.years;
    this.computeStats();
  }

  updateTime() {
    this.dateTimer = setInterval(_ => {
      if (this.goodConnection) {
        this.date = this.lib.dateTime();
      }
    }, 1000);
  }


  setYears(startYear) {

    var sY = startYear || 2009;
    var y = 2016;
    while (y >= sY) {
      this.years.push(y--);
    }
  }

  setDaysOfMonth(year, month) {
    this.startDays = [];
    var y = year || new Date().getFullYear();
    var m = month || new Date().getMonth() + 1;
    var numDays = this.lib.daysInMonth(y, m);
    for (let i = 0; i < numDays; i++) {
      this.startDays.push(i + 1);
    }

    console.log("this.days----", this.startDays);
  }

  //  statYearSelected(event){
  //
  //    console.log('year changed1----',event.target.value);
  //        this.currentStatSelectedYear = event.target.value;
  //  }

  statMothSelected(event) {
    //  console.log('month changed1----',event.target.value);
    //  this.currentStatSelectedMonth = event.target.value;
    //  this.setDaysOfMonth(this.currentStatSelectedYear,  this.currentStatSelectedMonth);
  }


  setStatsInitValues() {
    var d = new Date();
    this.statsEndDate = d.toISOString().slice(0, 10);
    d.setMonth(d.getMonth() - 1);//last month date;
    this.statsStartDate = d.toISOString().slice(0, 10);
    console.log('set stats date value-----', this.statsStartDate, this.statsEndDate);
  }



  getPlcStats() {
    this.statsData = [];

    var mode = 'month';
    if (this.isShowByDay) {
      mode = 'day';
    }

    this.gotTableData = false;
    console.log('get plc stats----', this.statsStartDate, this.statsEndDate, mode);
    this.request.get('/plc/stats/' + this.statsStartDate + '/' + this.statsEndDate + '/' + this.currentPlcTank + '/' + mode + '.json').subscribe(resp => {
      console.log("plc stats-----", resp);
      if (resp && resp.pl && resp.pl.plc) {
        this.statsData = resp.pl.plc;
      }

      this.gotTableData = true;
    });
  }

  computeStats() {
    console.log('this.statsStartDate,this.statsEndDate------', this.statsStartDate, this.statsEndDate);
    this.getPlcStats();
  }



  downloadData() {
    var which = '';
    var mode = null;

    if (this.selectedDownloadTab === 1) {
      which = 'instantaneous';
    }
    else if (this.selectedDownloadTab === 2) {
      which = 'dayly-usage';
      mode = 'day';
    }
    else if (this.selectedDownloadTab === 3) {
      which = 'monthly-usage';
      mode = 'month';
    }

    this.request.post('/plc/stats/download.json', { start: this.statsStartDate, end: this.statsEndDate, which: which, mode: mode, tank: this.currentPlcTank }).subscribe(res => {
      console.log("res-----", res);
      window.location.href = res.pl.file;
    });
  }


  initChart() {
    var that = this;

    this.request.get('/plc/forlasthours/' + this.currentPlcTank + '.json').subscribe(resp => {
      console.log("plc stats chart data-->>>:---", resp);
      if (resp && resp.pl && resp.pl.plc) {
        this.chartData = resp.pl.plc;
        this.generateChart();
      }
    });
  }

  plcMeterChanged(event) {
    this.currentPlcMetter = event.target.value;
    this.generateChart();
  }

  generateChart() {
    var that = this;
    var Y;
    if (this.currentPlcMetter == '1') {
      Y = that.chartData.values || [];
    } else {
      Y = that.chartData.values2 || [];
    }

    Y.unshift("瞬时流量");
    var X = that.chartData.dates || [];
    X.unshift('x');

    var statsChart = c3.generate({
      bindto: '#statsChart',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed
        columns: [X, Y]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            count: 24,
            //  format: function (x) { return x.getFullYear(); }
            format: '%H:%M' //how the date is displayed
          }
        }
      }
    });
  }
}
