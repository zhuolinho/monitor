
import {Component,AfterViewInit, OnDestroy} from '@angular/core';
import {LibService} from '../../../services/lib.service';
import {config} from '../../../config';
// import {GasDetail} from './details/gas.detail.component';
import {RTMessagesService} from '../../../services/rt-messages.service';
import {RequestService} from '../../../services/request.service';

declare var jQuery:any;
declare var _:any;
declare var io:any;
declare var d3:any;
declare var c3:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html'
  // directives:[GasDetail]
})

export class Gas  implements AfterViewInit,OnDestroy{

  testPlcs = [
    {
      "_id": "5810d7cfa7d1a71e69621e6b",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:23",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "3",
      "iwc2": "13.8",
      "isc2": "55.1",
      "p2": "398.1",
      "temp2": "17.5",
      "pwc2": "164633.0",
      "psc2": "2522930.0",
      "rsc2": "61.0",
      "cf2": "0",
      "er2": "0",
      "tank": "L001",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6c",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:4:32",
      "addr1": "2",
      "iwc1": "0",
      "isc1": "0",
      "p1": "365.7",
      "temp1": "22.6",
      "pwc1": "346385.0",
      "psc1": "6374181.0",
      "rsc1": "653.0",
      "cf1": "0",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L002",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6d",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:27",
      "addr1": "2",
      "iwc1": "28.2",
      "isc1": "107",
      "p1": "372.0",
      "temp1": "23.2",
      "pwc1": "37889.0",
      "psc1": "1649238.0",
      "rsc1": "0",
      "cf1": "0",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L003",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6e",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-26 11:26:9",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L004",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e6f",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:10",
      "addr1": "2",
      "iwc1": "83.5",
      "isc1": "298",
      "p1": "362.9",
      "temp1": "21.1",
      "pwc1": "605653.0",
      "psc1": "12117552.0",
      "rsc1": "545.0",
      "cf1": "0",
      "er1": "0",
      "addr2": "3",
      "iwc2": "0",
      "isc2": "0",
      "p2": "97.9",
      "temp2": "20.3",
      "pwc2": "0",
      "psc2": "141222.0",
      "rsc2": "0",
      "cf2": "0",
      "er2": "0",
      "tank": "L005",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e78",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-26 14:51:52",
      "addr1": "0",
      "iwc1": "0",
      "isc1": "0",
      "p1": "0",
      "temp1": "0",
      "pwc1": "0",
      "psc1": "0",
      "rsc1": "0",
      "cf1": "1",
      "er1": "0",
      "addr2": "0",
      "iwc2": "0",
      "isc2": "0",
      "p2": "0",
      "temp2": "0",
      "pwc2": "0",
      "psc2": "0",
      "rsc2": "0",
      "cf2": "1",
      "er2": "0",
      "tank": "L014",
      "__v": 0
    },
    {
      "_id": "5810d7cfa7d1a71e69621e7b",
      "muID": "system",
      "cuID": "system",
      "oID": "10000000001",
      "cd": "2016-10-27 00:20:31",
      "y": "2016",
      "m": "10",
      "d": "27",
      "dct": "2016-10-27 0:5:2",
      "cdct": "2016-10-27 0:5:19",
      "addr1": "2",
      "iwc1": "28.0",
      "isc1": "103",
      "p1": "372.6",
      "temp1": "22.9",
      "pwc1": "460190.0",
      "psc1": "7104624.0",
      "rsc1": "0",
      "cf1": "0",
      "er1": "0",
      "addr2": "3",
      "iwc2": "0",
      "isc2": "0",
      "p2": "94.6",
      "temp2": "22.8",
      "pwc2": "22693.0",
      "psc2": "440.0",
      "rsc2": "334.0",
      "cf2": "0",
      "er2": "0",
      "tank": "L017",
      "__v": 0
    }
  ];

  months:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  years:number[] = [];
  startDays:number[] = [];
  endDays:number[] = [];
  selectedtab:number;  //to switch tabs, the rest is controlled on the page
  currentTable:any;
  detailmodal:any = {};
  goodConnection:boolean = false;
  currentSelect:number[];
  dateTimer:any;
  dataTimer:number = 300000;
  lastDataTime:number =  0;
  chartData:any = [];
  checkInterruptionTimer:any;
  static graphIsRunning:boolean = false;


  availableTanks:any[] = [
        {id:'12345', selected:false},
        {id:'62545', selected:false},
        {id:'27456', selected:false},
        {id:'72145', selected:false},
        {id:'19345', selected:false},
        {id:'82345', selected:false},
        {id:'32345', selected:false},
        {id:'11345', selected:false},
        {id:'22345', selected:false},
        {id:'82322', selected:false},
        {id:'22325', selected:false},
        {id:'99345', selected:false},
        {id:'902345', selected:false},
        {id:'102345', selected:false},
        {id:'444235', selected:false},
        {id:'602345', selected:false},
        {id:'62340', selected:false},
        {id:'72305', selected:false},
        {id:'50345', selected:false},
        {id:'56665', selected:false}
    ]

    allTankSelected:boolean = false;
    selectedTanks:any[] = [];
    realTimeData:any = {};
    currentPlcTank:string = 'G001';
    connectedPlcs:string[] = [];
    date:any;
    // statSelectedStartYear:number = 2016;
    // statSelectedStartMonth:number = 1;
    // statSelectedStartDay:number = 1;
    // statSelectedEndYear:number = 2016;
    // statSelectedEndMonth:number = 2;
    // statSelecteEndDay:number = 1;
    statsStartDate:any;
    statsEndDate:any;
    isShowByDay:boolean;
    statsData:any[];
    plcAddresses:any[] = [];
    selectedDownloadTab:number = 1;
    newAlert:any = {
      st:[],
      atime:'',
      am:'',
      atype:'',
      addr:''
    };
    constructor(
        private request:RequestService,
        private rtmgs:RTMessagesService,
        private lib:LibService){
      console.log("gas is up and running");

      // realTimeData
      this.date = lib.dateTime();
      this.setYears(null);
      this.request.get('/plc/latest/withaddress.json').subscribe(resp => {
        console.log("latest plc>>>-----",resp);
        if(resp&&resp.pl&&resp.pl.plc&&resp.pl.address){

            // this.realTimeData = _.keyBy(resp.pl.plc,'tank');
            this.realTimeData = resp.pl.plc;
            this.plcAddresses = _.keyBy(resp.pl.address,'tank');
            // this.realTimeData = _.keyBy(this.testPlcs,'tank');
            this.connectedPlcs = Object.keys(this.realTimeData);
            this.currentPlcTank = this.connectedPlcs[0];
            console.log("this.currentPlcTank>>>------",this.currentPlcTank);
            // this.initSelect();
            console.log('got real time data>>>-----',this.realTimeData);
            console.log("this.connectedPlcs>>>----",this.connectedPlcs);
        }
      });
    }
    ngAfterViewInit(){
      this.iniSocket();
      this.updateTime();
    }


    ngOnDestroy(){
      clearInterval(this.dateTimer);
      // clearInterval(this.checkInterruptionTimer);
      Gas.graphIsRunning = false;
    }

    updateTime(){
       this.dateTimer = setInterval(_=>{
         if(this.goodConnection ){
            this.date = this.lib.dateTime();
         }
       },1000);
    }

    // checkInterruption(){
    //     this.checkInterruptionTimer = setInterval(_=>{
    //       var currentTime  = Date.now();
    //       if((currentTime - this.lastDataTime)>this.dataTimer){
    //         this.goodConnection = false;
    //       }
    //     },100000);
    //   }


    veReturnSelectedTanks(){
          this.createNewAlert("拉回报警");
    }

    veAddSelectedTanks(){
        this.createNewAlert("进场报警");
    }

    createNewAlert(type){

      console.log("selectedTanks--",this.selectedTanks.length,this.selectedTanks);

      if(this.selectedTanks.length){
        for (let i = 0; i < this.selectedTanks.length; i++) {
          this.newAlert.st.push({ti:this.selectedTanks[i].id});
        }
        this.newAlert.am = type;
        this.newAlert.atype = type;
        this.newAlert.atime = this.lib.dateTime();
        this.newAlert.addr = "C003-闸北区大宁路3325号";

          console.log("posting--",  this.newAlert);
        this.request.post('/plc/alert.json',this.newAlert).subscribe(res => {
          console.log("alert created----",res);
           jQuery('#moveTanksFeedbackModal').openModal();
        });
      }
    }


   veToggleSelectAllTanks(){
      this.selectedTanks = [];
     if(!this.allTankSelected){
       for (let i = 0; i < this.availableTanks.length; i++) {
            this.availableTanks[i].selected = true;
        }
        this.selectedTanks = this.availableTanks;
     }
     else{
       for (let i = 0; i < this.availableTanks.length; i++) {
            this.availableTanks[i].selected = false;
        }
     }

    //  console.log("this.selectedTanks ----",this.selectedTanks.length, this.selectedTanks );
     this.allTankSelected = !this.allTankSelected;

   }

   veToggleSelectTank(tank){
     tank.selected = !tank.selected;
     if(tank.selected){
          this.selectedTanks.push(tank);
     }
     else{
       var array =  _.remove(this.selectedTanks, function(o){
          return o.id == tank.id;
        })
     }

   }


     iniSocket(){
         var that = this;
          this.rtmgs.connect(3003);
          this.rtmgs.on('realTimePlc', function(data){

            if(!that.goodConnection){
              that.goodConnection = true;
            }

            console.log("realTimePlc-----",data);
            if(data&&data.pl&& data.pl.plc){
                // that.realTimeData = _.keyBy(data.pl.plc,'tank');
                that.realTimeData = data.pl.plc
                that.connectedPlcs = Object.keys(that.realTimeData);
                that.initSelect();
            }
          });

          this.rtmgs.on('plcDataInterruption', function(data){
              console.log('plcDataInterruption', data);
              that.goodConnection = false;
          });
       }


     initSelect(){

       var that = this;
       setTimeout(_=>{
            jQuery('select:not(simple-select)').material_select();

            jQuery('select.current-plc').change(function(e){
              console.log('changed');
              that.setCurrentPlc(e);
            });
            // jQuery('select.select-year').change(function(e){
            //           that.statYearSelected(e);
            // });
            //
            // jQuery('select.select-month').change(function(e){
            //     that.statMothSelected(e);
            // });
       });
     }


     setCurrentPlc(event){
        this.currentPlcTank  = event.target.value;

        console.log('this.currentPlcTank---',this.currentPlcTank);
     }

     setYears(startYear){

       var sY = startYear||2009;
       var y = 2016;
       while ( y >=sY) {
           this.years.push(y--);
       }
     }

     setDaysOfMonth(year,month){
       this.startDays = [];
       var y = year||new Date().getFullYear();
       var m = month || new Date().getMonth() + 1;
       var numDays = this.lib.daysInMonth(y,m);
       for (let i = 0; i <numDays; i++) {
           this.startDays.push(i+1);
       }

       console.log("this.days----",this.startDays);
     }

    //  statYearSelected(event){
     //
    //    console.log('year changed1----',event.target.value);
    //        this.currentStatSelectedYear = event.target.value;
    //  }

     statMothSelected(event){
          //  console.log('month changed1----',event.target.value);
          //  this.currentStatSelectedMonth = event.target.value;
          //  this.setDaysOfMonth(this.currentStatSelectedYear,  this.currentStatSelectedMonth);
     }

    showDetailModal(param){
      var that = this;

      this.setStatsInitValues();

      jQuery("#gasUsageDetailModal").openModal({
           ready: function() {
               that.initChart();
            }
      });
    }

    setStatsInitValues(){


      var d = new Date();
      this.statsEndDate = d.toISOString().slice(0,10);
      d.setMonth(d.getMonth() - 1);//last month date;
      this.statsStartDate = d.toISOString().slice(0,10);
      console.log('set stats date value-----', this.statsStartDate,this.statsEndDate);
    }



    getPlcStats(){
      this.statsData = [];

      var mode = 'month';
      if(this.isShowByDay){
        mode = 'day';
      }

      console.log('get plc stats----', this.statsStartDate, this.statsEndDate, mode);
      this.request.get('/plc/stats/'+this.statsStartDate+'/'+this.statsEndDate+'/'+this.currentPlcTank+'/'+mode+'.json').subscribe(resp => {
        console.log("plc stats-----",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.statsData = resp.pl.plc;
        }
      });
    }

    computeStats(){
      console.log('this.statsStartDate,this.statsEndDate------',this.statsStartDate,this.statsEndDate);
        this.getPlcStats();
    }



    downloadData(){

        var which = '';
        var mode = null;

        if(this.selectedDownloadTab === 1){
          which = 'instantaneous';
        }
        else   if(this.selectedDownloadTab === 2){
            which = 'dayly-usage';
            mode = 'day';
        }
        else   if(this.selectedDownloadTab === 3){
            which = 'monthly-usage';
            mode = 'month';
        }


        this.request.post('/plc/stats/download.json',{start:this.statsStartDate,end:this.statsEndDate,which:which,mode:mode,tank:this.currentPlcTank}).subscribe(res => {
          console.log("res-----",res);
          window.location = res.pl.file;
        });
      }


    // code for detail modal
    showByDay(fromModal){
        // alert('by day');
        console.log("by day");
        if(fromModal){
            this.initChart();
        }

        this.isShowByDay = true;
        this.computeStats();
    }

    showByMonth(fromModal){
        // alert('by month');
        console.log("by month");

        if(fromModal){
            this.initChart();
        }
        this.isShowByDay = false;

       // re-initialize material-select
        this.currentSelect = this.years;
        this.computeStats();
    }

    initChart(){
      var that = this;

      this.request.get('/plc/forlasthours/'+this.currentPlcTank+'.json').subscribe(resp => {
        console.log("plc stats chart data-->>>:---",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.chartData = resp.pl.plc;
            this.generateChart();
        }
      });

    }

    generateChart(){
      var that = this;
      var Y = that.chartData.values||[];
      Y.unshift("瞬时流量");
      var X = that.chartData.dates||[];
      X.unshift('x');

      var statsChart = c3.generate({
              bindto: '#statsChart',
              data: {
                  x: 'x',
                  xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed
                  columns:[X,Y]
              },
              axis : {
                    x: {
                    type: 'timeseries',
                   tick: {
                       count: 12,
                       format:'%H:%M' //how the date is displayed
                   }
                  }
              }
          });
    }





    // initGrapth(){
    //
    //   var that = this;
    //
    //   if(!Gas.graphIsRunning){
    //      Gas.graphIsRunning = true;
    //      var INTERVAL = Math.PI / 30;
    //
    //     // Precompute wave
    //     var d = d3.range(0, Math.PI / 2 + INTERVAL, INTERVAL),
    //         sinWave = d.map(Math.sin);
    //
    //     var w = 900, h = 150,
    //         x = d3.scale.linear().domain([-5, 15]).range([0, w]),
    //         y = x,
    //         r = (function(a, b) {
    //       return Math.sqrt(a * a + b * b);
    //     })(x.invert(w), y.invert(h));
    //
    //     var realTimeSigStatus = d3.select("#realTimeSigStatus").append("svg")
    //         .attr("width", w).attr("height", h);
    //
    //     realTimeSigStatus.append("g")
    //         .attr("id", "sinwave")
    //         .attr("width", w)
    //         .attr("height", h)
    //         .attr("transform", "translate("+x(-11.2)+","+y(-8)+")")
    //       .selectAll("path")
    //         .data([d3.range(0, 8 * Math.PI + INTERVAL, INTERVAL).map(Math.sin)])
    //       .enter().append("path")
    //         .attr("class", "wave")
    //         .attr("d", d3.svg.line()
    //           .x(function(d, i) { return x(i * INTERVAL) - x(0) })
    //           .y(function(d) { return y(d) }));
    //
    //     var line = function(e, x1, y1, x2, y2) {
    //       return e.append("line")
    //           .attr("class", "line")
    //           .attr("x1", x1)
    //           .attr("y1", y1)
    //           .attr("x2", x2)
    //           .attr("y2", y2);
    //     }
    //     var axes = function(cx, cy, cls) {
    //       cx = x(cx); cy = y(cy);
    //       line(realTimeSigStatus, cx, 0, cx, h).attr("class", cls || "line")
    //       line(realTimeSigStatus, 0, cy, w, cy).attr("class", cls || "line")
    //     }
    //
    //     axes(3, -2, "edge");
    //     axes(3, -3, "axis");
    //
    //     var offset = -4*Math.PI, last = 0;
    //
    //     d3.timer(function(elapsed) {
    //       if(that.goodConnection){
    //         offset += (elapsed - last) / 1000;
    //         last = elapsed;
    //         if (offset > -2*Math.PI) offset = -4*Math.PI;
    //         realTimeSigStatus.selectAll("#sinwave")
    //           .attr("transform", "translate(" + x(offset+Math.PI/20) + "," + y(-8)+ ")")
    //         var xline = x(Math.sin(offset)) - x(0);
    //         var yline = x(-Math.cos(offset)) - y(0);
    //
    //         realTimeSigStatus.select("#xline")
    //           .attr("transform", "translate(0," + xline + ")");
    //         realTimeSigStatus.select("#yline")
    //           .attr("transform", "translate(" + yline + ",0)");
    //       }
    //     });
    //   }
    //
    // }

 }
