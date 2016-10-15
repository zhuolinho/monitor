
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

  months:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  // months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
  years:number[] = [];
  // days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
  //                   '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
  //                   '25日','26日','27日','28日','29日','30日','31日'
  //                 ];

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
    realTimeData:any;
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
      this.request.get('/plc/latest.json').subscribe(resp => {
        console.log("latest plc-----",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.realTimeData = resp.pl.plc;
        }
      });
    }
    ngAfterViewInit(){
      this.iniSocket();
      this.initSelect();
      this.updateTime();
      // this.checkInterruption();
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

  //  iniSocket(){
  //       var that = this;
  //        var url = 'http://'+window.location.hostname+':3003';
  //        var socket = io(url);
  //       socket.on('realTimePlc', function(data){
   //
  //         if(!that.goodConnection){
  //           that.goodConnection = true;
  //         }
   //
  //         console.log("realTimePlc-----",data);
  //         if(data&&data.pl&& data.pl.plc){
  //             that.realTimeData = data.pl.plc;
  //         }
   //
  //       });
   //
   //
  //       socket.on('plcDataInterruption', function(data){
  //             console.log('plcDataInterruption', data);
  //             that.goodConnection = false;
  //       });
  //    }



     iniSocket(){
         var that = this;
          this.rtmgs.connect(3003);
          this.rtmgs.on('realTimePlc', function(data){

            if(!that.goodConnection){
              that.goodConnection = true;
            }

            console.log("realTimePlc-----",data);
            if(data&&data.pl&& data.pl.plc){
                that.realTimeData = data.pl.plc;
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
            // jQuery('select.select-year').change(function(e){
            //           that.statYearSelected(e);
            // });
            //
            // jQuery('select.select-month').change(function(e){
            //     that.statMothSelected(e);
            // });
       });
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
      this.request.get('/plc/stats/'+this.statsStartDate+'/'+this.statsEndDate+'/'+mode+'.json').subscribe(resp => {
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


        this.request.post('/plc/stats/download.json',{start:this.statsStartDate,end:this.statsEndDate,which:which,mode:mode}).subscribe(res => {
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

      this.request.get('/plc/forlasthours.json').subscribe(resp => {
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
