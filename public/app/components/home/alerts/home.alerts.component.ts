
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { config } from '../../../config';

import { AlertModel } from '../../../models/alert-model';
import { RequestService } from '../../../services/request.service';
import { UserService } from '../../../services/user.service';
import { RTMessagesService } from '../../../services/rt-messages.service';
// import {CORE_DIRECTIVES} from '@angular/common';
import { LibService } from '../../../services/lib.service';
declare var jQuery: any;
declare var _: any;
declare var io: any;
declare var d3: any;
declare var c3: any;

@Component({
  selector: 'home-alerts',
  templateUrl: config.prefix + '/components/home/alerts/home.alerts.component.html',
  // directives:[CORE_DIRECTIVES]
})

export class HomeAlerts implements AfterViewInit, OnInit, OnDestroy {

  currentSort: string = 'all';

  alertsList: any[] = [];
  alertGroups: any;
  hasData: boolean = true;

  user: any;



  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
  years: number[] = [];
  // days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
  //                   '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
  //                   '25日','26日','27日','28日','29日','30日','31日'
  //                 ];

  days: number[] = [];

  selectedtab: number;  //to switch tabs, the rest is controlled on the page
  currentTable: any;
  currentSelect: number[];
  detailmodal: any = {};
  realTimeData: any;
  currentTankMovingAlert: any = {};
  currentStatSelectedYear: number = 2016;
  currentStatSelectedMonth: number = 1;
  isShowByDay: boolean = false;
  showModal: boolean = false;
  plcAddresses: any;
  statsStartDate: any;
  statsEndDate: any;
  connectedPlcs: any;
  statsData: any[];
  tmpEditTtank: any = {};
  ttankNgModel: any = {};
  currentPlcTank: string;

  goodConnection: boolean = false;
  dateTimer: any;
  dataTimer: number = 300000;
  lastDataTime: number = 0;
  checkInterruptionTimer: any;

  constructor(private request: RequestService,
    private userSrvc: UserService,
    private rtmgs: RTMessagesService,
    private lib: LibService) {
    console.log("Home alerts is up and running");
    var self = this;
    this.user = this.userSrvc.getUser();
    console.log("this.user----", this.user);
    this.request.get('/plc/alerts/unprocessed.json').subscribe(res => {
      if (res.pl && res.pl.alerts) {
        this.alertsList = res.pl.alerts;
        if (!this.alertsList.length) {
          this.hasData = false;
        }
        console.log("this.alertsList---", this.alertsList);
        this.alertGroups = _.groupBy(this.alertsList, 'atype');
      }
    });
    // /plc/alerts/all
  }

  ngAfterViewInit() {
    this.iniSocket();
    this.initUi();
  }

  ngOnInit() {
    this.request.get('/plc/latest/withaddress.json').subscribe(resp => {
      console.log("latest plc>>>-----", resp);
      if (resp && resp.pl && resp.pl.plc && resp.pl.address) {

        // this.realTimeData = _.keyBy(resp.pl.plc,'tank');
        this.realTimeData = resp.pl.plc;
        this.plcAddresses = _.keyBy(resp.pl.address, 'tank');
        // this.realTimeData = _.keyBy(this.testPlcs,'tank');
        this.connectedPlcs = Object.keys(this.realTimeData);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.dateTimer);
  }

  veSortBy(wich) {
    if (this.currentSort != wich) {
      this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
      setTimeout(_ => {
        this.currentSort = wich;
        this.initUi();
      }, 100);
    }
  }

  veEditTransportableTank(alert) {
    this.tmpEditTtank[alert.tank] = alert.ttank; //temporarily keep tank.
    this.ttankNgModel[alert.tank] = alert.ttank;
    alert.ttank = null;
  }

  veCancelEditTransportableTank(alert) {
    alert.ttank = this.tmpEditTtank[alert.tank];
    this.tmpEditTtank[alert.tank] = null;
  }


  veSetTransportableTank(alert, ttank) {
    if (ttank) {
      alert.ttank = ttank;
    }
    console.log("ttank-----", ttank);
    console.log("posting alert-----", alert);
    this.request.put('/plc/alert.json', alert).subscribe(res => {
      console.log("alert ttank updated", res);
      this.tmpEditTtank[alert.tank] = null;
    });
  }


  veProcessed(alert) {
    var self = this;
    alert.pt = this.lib.dateTime();

    console.log("alert.pt------", alert.pt)


    alert.status = 1;
    alert.pa = this.user.an;

    console.log("alert------", alert);
    this.request.put('/plc/processed/alert.json', alert).subscribe(res => {
      console.log("alert updated", res);
      var newArray = _.remove(this.alertGroups[alert.atype], function(o) {
        return o._id == alert._id;
      });
    });
  }

  initUi() {
    var self = this;
    setTimeout(_ => {
      jQuery('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() { console.log('Ready'); jQuery('select').material_select(); }, // Callback for Modal open
        complete: function() { console.log('Closed'); } // Callback for Modal close
      });
      //  alert('getting models up');
    });
  }

  iniSocket() {
    var that = this;
    this.rtmgs.connect(3003);
    this.rtmgs.on('newPlcAlert', function(data) {
      console.log("got new alert---", data);
      if (data && data.pl && data.pl.alert) {
        that.alertsList.unshift(data.pl.alert);
        that.alertGroups = _.groupBy(that.alertsList, 'atype');  // TODO 余量报警 => 余量警报 sms can't use the word 报警
        console.log("that.alertGroups ----", that.alertGroups);
        that.hasData = true;
      }
    });
  }

  showTankMovingModal(alert) {
    console.log("selected alert----", alert);
    this.currentTankMovingAlert = alert;
    jQuery("#returnAlertDetailModal").openModal({
      ready: function() {
        // jQuery('select').material_select();
      }
    });
  }

  showDetailModal(alert) {
    var that = this;

    this.currentPlcTank = alert.tank;
    that.showModal = false;

    jQuery("#gasUsageDetailModal").openModal({
      ready: function() {
        that.showModal = true;
      }
    });
  }
}
