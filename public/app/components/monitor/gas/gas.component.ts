import { Component, AfterViewInit, OnInit, OnDestroy } from "@angular/core";
import { LibService } from "../../../services/lib.service";
import { config } from "../../../config";
// import {GasDetail} from './details/gas.detail.component';
import { RTMessagesService } from "../../../services/rt-messages.service";
import { RequestService } from "../../../services/request.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

declare var jQuery: any;
declare var _: any;
declare var io: any;
declare var d3: any;
declare var c3: any;

@Component({
  selector: "gas",
  templateUrl: config.prefix + "/components/monitor/gas/gas.component.html",
  styleUrls: [config.prefix + "/components/monitor/gas/gas.component.css"]
  // directives:[GasDetail]
})
export class Gas implements AfterViewInit, OnInit, OnDestroy {
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [];
  startDays: number[] = [];
  endDays: number[] = [];
  selectedtab: number; //to switch tabs, the rest is controlled on the page
  currentTable: any;
  detailmodal: any = {};
  goodConnection: boolean = false;
  currentSelect: number[];
  dateTimer: any;
  dataTimer: number = 300000;
  lastDataTime: number = 0;
  currentPlcMetter: string = "1";
  chartData: any = [];
  tankId: "";
  checkInterruptionTimer: any;
  static graphIsRunning: boolean = false;

  availableTanks: any[] = [];
  allTankSelected: boolean = false;
  selectedTanks: any[] = [];
  realTimeData: any = {};
  currentPlcTank: string = "G001";
  connectedPlcs: string[] = [];
  date: any;
  // statSelectedStartYear:number = 2016;
  // statSelectedStartMonth:number = 1;
  // statSelectedStartDay:number = 1;
  // statSelectedEndYear:number = 2016;
  // statSelectedEndMonth:number = 2;
  // statSelecteEndDay:number = 1;
  statsStartDate: any;
  statsEndDate: any;
  isShowByDay: boolean;
  showModal: boolean = false;
  statsData: any[];
  plcAddresses: any[] = [];
  selectedDownloadTab: number = 1;
  newAlert: any = {
    st: [],
    atime: "",
    am: "",
    atype: "",
    addr: ""
  };

  constructor(
    private request: RequestService,
    private rtmgs: RTMessagesService,
    private route: ActivatedRoute,
    private lib: LibService
  ) {
    console.log("gas is up and running--->>>>");

    // realTimeData
    this.date = lib.dateTime();
    this.setYears(null);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.tankId = params["tankId"];
      // if (this.tankId) {
      //   this.getPlcStats();
      // }
      console.log("params['tank']----", this.tankId);

      this.request.get("/plc/latest/withaddress.json").subscribe(resp => {
        console.log("latest plc>>>-----", resp);
        if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
          this.realTimeData = resp.pl.plc;
          this.plcAddresses = _.orderBy(
            resp.pl.address,
            o => {
              //TODO plc must have addr to be available on the drop down
              if (o.addr) {
                return parseInt(o.addr.slice(0, 3));
              }
              return undefined;
            },
            ["asc"]
          );

          this.connectedPlcs = _.keyBy(this.realTimeData, "tank");

          console.log("this.connectedPlcs---", this.connectedPlcs);

          if (this.tankId) {
            this.currentPlcTank = this.tankId;
          } else if (this.plcAddresses && this.plcAddresses[0]) {
            this.currentPlcTank = this.plcAddresses[0].tank; // TODO assuming there is matching plc available
          }

          this.initSelect();
        }
      });

      this.request.get("/plc/tanks/all.json").subscribe(resp => {
        console.log("availableTanks>>>-----", resp);
        if (resp && resp.pl && resp.pl.tank && resp.pl.tank) {
          this.availableTanks = resp.pl.tank;
        }
      });
    });
  }

  ngAfterViewInit() {
    this.iniSocket();
    this.updateTime();
  }

  ngOnDestroy() {
    clearInterval(this.dateTimer);
    // clearInterval(this.checkInterruptionTimer);
    Gas.graphIsRunning = false;
  }

  updateTime() {
    this.dateTimer = setInterval(_ => {
      if (this.goodConnection) {
        this.date = this.lib.dateTime();
      }
    }, 1000);
  }

  // checkInterruption(){
  //     this.checkInterruptionTimer = setInterval(_=>{
  //       var currentTime  = Date.now();
  //       if((currentTime - this.lastDataTime)>this.dataTimer){
  //         this.goodConnection = false;
  //       }
  //     },100000);
  //   }

  veReturnSelectedTanks() {
    this.createNewAlert("拉回报警");
  }

  veAddSelectedTanks() {
    this.createNewAlert("进场报警");
  }

  createNewAlert(type) {
    console.log(
      "selectedTanks--",
      this.selectedTanks.length,
      this.selectedTanks
    );

    this.newAlert = {
      st: [],
      atime: "",
      am: "",
      atype: "",
      addr: ""
    };

    if (this.selectedTanks.length) {
      for (let i = 0; i < this.selectedTanks.length; i++) {
        this.newAlert.st.push({ ti: this.selectedTanks[i].tank });
      }
      this.newAlert.am = type;
      this.newAlert.atype = type;
      this.newAlert.atime = this.lib.dateTime();
      this.newAlert.addr = "C003-闸北区大宁路3325号";

      console.log("posting--", this.newAlert);
      this.request.post("/plc/alert.json", this.newAlert).subscribe(res => {
        console.log("alert created----", res);
        jQuery("#moveTanksFeedbackModal").openModal();
      });
    }
  }

  veToggleSelectAllTanks() {
    this.selectedTanks = [];
    if (!this.allTankSelected) {
      for (let i = 0; i < this.availableTanks.length; i++) {
        this.availableTanks[i].selected = true;
      }

      this.selectedTanks = _.clone(this.availableTanks);
    } else {
      for (let i = 0; i < this.availableTanks.length; i++) {
        this.availableTanks[i].selected = false;
      }
    }
    //  console.log("this.selectedTanks ----",this.selectedTanks.length, this.selectedTanks );
    this.allTankSelected = !this.allTankSelected;
  }

  veToggleSelectTank(tank) {
    tank.selected = !tank.selected;
    console.log("veToggleSelectTank----", tank);
    if (tank.selected) {
      this.selectedTanks.push(tank);
    } else {
      var array = _.remove(this.selectedTanks, function(o) {
        return o.tank == tank.tank;
      });
    }
  }

  iniSocket() {
    var that = this;
    this.rtmgs.connect(3003);
    this.rtmgs.on("realTimePlc", function(data) {
      if (!that.goodConnection) {
        that.goodConnection = true;
      }

      console.log("realTimePlc-----", data);
      if (data && data.pl && data.pl.plc) {
        // that.realTimeData = _.keyBy(data.pl.plc,'tank');
        that.realTimeData = data.pl.plc;
        this.connectedPlcs = _.keyBy(that.realTimeData, "tank");
        jQuery("select:not(simple-select)").material_select();
      }
    });

    this.rtmgs.on("plcDataInterruption", function(data) {
      console.log("plcDataInterruption", data);
      that.goodConnection = false;
    });
  }

  initSelect() {
    var that = this;
    setTimeout(_ => {
      jQuery("select:not(simple-select)").material_select();

      jQuery("select.current-plc").change(function(e) {
        console.log("changed");
        that.setCurrentPlc(e);
      });
    });
  }

  setCurrentPlc(event) {
    this.currentPlcTank = event.target.value;

    console.log("this.currentPlcTank---", this.currentPlcTank);
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

  showDetailModal(param) {
    var that = this;

    if (param === "day") {
      this.isShowByDay = true;
    } else if (param === "month") {
      this.isShowByDay = false;
    }
    that.showModal = false;

    jQuery("#gasUsageDetailModal").openModal({
      ready: function() {
        that.showModal = true;
      }
    });
  }
}

// availableTanks: any[] = [
//   { id: '12345', selected: false },
//   { id: '62545', selected: false },
//   { id: '27456', selected: false },
//   { id: '72145', selected: false },
//   { id: '19345', selected: false },
//   { id: '82345', selected: false },
//   { id: '32345', selected: false },
//   { id: '11345', selected: false },
//   { id: '22345', selected: false },
//   { id: '82322', selected: false },
//   { id: '22325', selected: false },
//   { id: '99345', selected: false },
//   { id: '902345', selected: false },
//   { id: '102345', selected: false },
//   { id: '444235', selected: false },
//   { id: '602345', selected: false },
//   { id: '62340', selected: false },
//   { id: '72305', selected: false },
//   { id: '50345', selected: false },
//   { id: '56665', selected: false }
// ]
