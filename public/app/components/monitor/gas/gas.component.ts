
import {Component, provide,AfterViewInit} from 'angular2/core';
import {LibService} from '../../../services/lib.service';
import {config} from '../../../config';
// import {GasDetail} from './details/gas.detail.component';
import {RequestService} from '../../../services/request.service';

declare var jQuery:any;
declare var _:any;
 declare var io:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html'
  // directives:[GasDetail]
})

export class Gas  implements AfterViewInit{


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
  currentSelect:string[];






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
      this.initModal();
      this.showByDay();
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
          console.log("realTimePlc-----",data);
          if(data&&data.pl&&data.pl.plc){
              that.realTimeData = data.pl.plc;
          }
        });
     }


    initModal(){

      var that = this;
        // gasUsageDetailModal
        // setTimeout(_=>{
        //     jQuery('.modal-trigger').leanModal({
        //          dismissible: true, // Modal can be dismissed by clicking outside of the modal
        //          opacity: .5, // Opacity of modal background
        //          in_duration: 300, // Transition in duration
        //          out_duration: 200, // Transition out duration
        //          ready: function() { console.log('Ready');}, // Callback for Modal open
        //          complete: function() { console.log('Closed'); } // Callback for Modal close
        //    });
        //   //  alert('getting models up');
        // });
    }


    showDetailModal(mail){
      jQuery("#gasUsageDetailModal").openModal();
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
 }
