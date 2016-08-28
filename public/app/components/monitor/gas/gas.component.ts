
import {Component, provide,AfterViewInit, OnDestroy} from 'angular2/core';
import {LibService} from '../../../services/lib.service';
import {config} from '../../../config';
// import {GasDetail} from './details/gas.detail.component';
import {RequestService} from '../../../services/request.service';

declare var jQuery:any;
declare var _:any;
declare var io:any;
declare var d3:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html'
  // directives:[GasDetail]
})

export class Gas  implements AfterViewInit,OnDestroy{


  tableByday:any[] = [{code:'C002',date:'1月1号', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                      {code:'C002',date:'1月2号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月3号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月4号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月5号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月6号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月7号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月8号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月9号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月10号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月11号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月12号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月13号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月14号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月15号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月16号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月17号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月18号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月19号', if:0.0000, af:0.0000, mf:0.0000},
                      {code:'C002',date:'1月20号', if:0.0000, af:0.0000, mf:0.0000}
    ];



    tableByMonth:any[] = [
                        {code:'C002',date:'1月份', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                        {code:'C002',date:'2月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'3月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'4月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'5月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'6月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'7月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'8月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'9月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'10月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'11月份', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'12月份', if:0.0000, af:0.0000, mf:0.0000}
      ];

  months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
  years:string[] = ['2016年','2015年','2014年','2013年','2012年','2011年','2010年','2009年','2008年','2007年']
  days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
                    '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
                    '25日','26日','27日','28日','29日','30日','31日'
                  ];

  selectedtab:number;  //to switch tabs, the rest is controlled on the page
  currentTable:any;
  detailmodal:any = {};
  goodConnection:boolean = false;
  currentSelect:string[];
  dateTimer:any;
  dataTimer:number = 300000;
  lastDataTime:number =  0;
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
    newAlert:any = {
      st:[],
      atime:'',
      am:'',
      atype:'',
      addr:''
    };
    constructor(private request:RequestService,
        private lib:LibService){
      console.log("gas is up and running");

      // realTimeData


      this.date = lib.dateTime();
      this.request.get('/plc/latest.json').subscribe(resp => {
        // console.log("latest plc-----",resp);
        if(resp&&resp.pl&&resp.pl.plc){
            this.realTimeData = resp.pl.plc;
        }

      });
    }
    ngAfterViewInit(){
      this.iniSocket();
      this.initSelect();
      this.showByDay();
      this.updateTime();
      this.checkInterruption();
    }

    ngOnDestroy(){
      clearInterval(this.dateTimer);
      clearInterval(this.checkInterruptionTimer);
      Gas.graphIsRunning = false;
    }

    updateTime(){
       this.dateTimer = setInterval(_=>{
         if(this.goodConnection ){
            this.date = this.lib.dateTime();
         }
       },1000);
    }


        checkInterruption(){
          this.checkInterruptionTimer = setInterval(_=>{
            var currentTime  = Date.now();
            if((currentTime - this.lastDataTime)>this.dataTimer){
              this.goodConnection = false;
            }
          },100000);
        }

    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }


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
         var url = 'http://139.196.18.222:3003';

         if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
           url = 'http://localhost:3003';
         }
         var socket = io(url);
        socket.on('realTimePlc', function(data){

          if(!that.goodConnection){
            that.goodConnection = true;
          }

          console.log("realTimePlc-----",data);
          if(data&&data.main&&data.main.pl&&data.main.pl.plc){
              that.realTimeData = data.main.pl.plc;
          }

          if(data.interval){
            that.dataTimer = data.interval;
            that.lastDataTime = Date.now();
          }
        });
     }

    showDetailModal(mail){
      var that = this;
      jQuery("#gasUsageDetailModal").openModal({
           ready: function() {
                that.initGrapth();
            }
      });
    }

// code for detail modal
    showByDay(){
        // alert('by day');
        console.log("by day");
        this.currentTable = this.tableByday;
        this.currentSelect = this.months;
        this.initSelect();

    }

    showByMonth(){
      //  alert('by month');
        console.log("by month");
        this.currentTable = this.tableByMonth;
        this.currentSelect = this.years;
        this.initSelect();
    }

    initGrapth(){

      var that = this;

      if(!Gas.graphIsRunning){
         Gas.graphIsRunning = true;
         var INTERVAL = Math.PI / 30;

        // Precompute wave
        var d = d3.range(0, Math.PI / 2 + INTERVAL, INTERVAL),
            sinWave = d.map(Math.sin);

        var w = 900, h = 150,
            x = d3.scale.linear().domain([-5, 15]).range([0, w]),
            y = x,
            r = (function(a, b) {
          return Math.sqrt(a * a + b * b);
        })(x.invert(w), y.invert(h));

        var realTimeSigStatus = d3.select("#realTimeSigStatus").append("svg")
            .attr("width", w).attr("height", h);

        realTimeSigStatus.append("g")
            .attr("id", "sinwave")
            .attr("width", w)
            .attr("height", h)
            .attr("transform", "translate("+x(-11.2)+","+y(-8)+")")
          .selectAll("path")
            .data([d3.range(0, 8 * Math.PI + INTERVAL, INTERVAL).map(Math.sin)])
          .enter().append("path")
            .attr("class", "wave")
            .attr("d", d3.svg.line()
              .x(function(d, i) { return x(i * INTERVAL) - x(0) })
              .y(function(d) { return y(d) }));

        var line = function(e, x1, y1, x2, y2) {
          return e.append("line")
              .attr("class", "line")
              .attr("x1", x1)
              .attr("y1", y1)
              .attr("x2", x2)
              .attr("y2", y2);
        }
        var axes = function(cx, cy, cls) {
          cx = x(cx); cy = y(cy);
          line(realTimeSigStatus, cx, 0, cx, h).attr("class", cls || "line")
          line(realTimeSigStatus, 0, cy, w, cy).attr("class", cls || "line")
        }

        axes(3, -2, "edge");
        axes(3, -3, "axis");

        var offset = -4*Math.PI, last = 0;

        d3.timer(function(elapsed) {
          if(that.goodConnection){ p;
            offset += (elapsed - last) / 1000;
            last = elapsed;
            if (offset > -2*Math.PI) offset = -4*Math.PI;
            realTimeSigStatus.selectAll("#sinwave")
              .attr("transform", "translate(" + x(offset+Math.PI/20) + "," + y(-8)+ ")")
            var xline = x(Math.sin(offset)) - x(0);
            var yline = x(-Math.cos(offset)) - y(0);

            realTimeSigStatus.select("#xline")
              .attr("transform", "translate(0," + xline + ")");
            realTimeSigStatus.select("#yline")
              .attr("transform", "translate(" + yline + ",0)");
          }
        });
      }

    }
 }
