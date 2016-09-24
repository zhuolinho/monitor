
import {Component,AfterViewInit} from '@angular/core';
import {config} from '../../../config';

import {AlertModel} from '../../../models/alert-model';
import {RequestService} from '../../../services/request.service';
import {UserService} from '../../../services/user.service';
// import {CORE_DIRECTIVES} from '@angular/common';
import {LibService} from '../../../services/lib.service';
declare var jQuery:any;
declare var _:any;
declare var io:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html',
  // directives:[CORE_DIRECTIVES]
})

export class HomeAlerts implements AfterViewInit{

    currentSort:string = 'all';

    alertsList:any[] = [];
    alertGroups:any;
    hasData:boolean = true;

    user:any;



    months:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
    // months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
    years:number[] = [];
    // days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
    //                   '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
    //                   '25日','26日','27日','28日','29日','30日','31日'
    //                 ];

    days:number[] = [];

    selectedtab:number;  //to switch tabs, the rest is controlled on the page
    currentTable:any;
    currentSelect:number[];
    detailmodal:any = {};
    realTimeData:any;
    currentStatSelectedYear:number = 2016;
    currentStatSelectedMonth:number = 1;
    isShowByDay:boolean;
    statsData:any[];

    constructor(private request:RequestService, private userSrvc:UserService, private lib:LibService){
    console.log("Home alerts is up and running");
      var self = this;
      this.user = this.userSrvc.getUser();
      console.log("this.user----",this.user);
      this.setYears(null);
      this.request.get('/plc/alerts/unprocessed.json').subscribe(res => {
        if(res.pl && res.pl.alerts){
            this.alertsList = res.pl.alerts;
            if(!this.alertsList.length){
              this.hasData = false;
            }
            console.log("this.alertsList---",this.alertsList);
            this.alertGroups =  _.groupBy(this.alertsList,'atype');
        }
      });

      // /plc/alerts/all
    }

    ngAfterViewInit(){
      this.iniSocket();
        this.initUi();
    }


    veSortBy(wich){
      if(this.currentSort != wich){
        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
        setTimeout(_=>{
          this.currentSort = wich;
          this.initUi();
        },100);
      }
    }

    veProcessed(alert){
      var self = this;
      alert.pt = this.lib.dateTime();
      alert.status = 1;
      alert.pa = this.user.an;

     console.log("alert------",alert);

      this.request.put('/plc/alert.json', alert).subscribe(res => {
          console.log("alert updated",res);
        var newArray = _.remove(this.alertGroups[alert.atype],function(o){
              return o._id == alert._id;
        });
      });
    }

    initUi(){
      var self = this;
        setTimeout(_=>{
            jQuery('.modal-trigger').leanModal({
                 dismissible: true, // Modal can be dismissed by clicking outside of the modal
                 opacity: .5, // Opacity of modal background
                 in_duration: 300, // Transition in duration
                 out_duration: 200, // Transition out duration
                 ready: function() { console.log('Ready');  self.initSelect()}, // Callback for Modal open
                 complete: function() { console.log('Closed'); } // Callback for Modal close
           });
          //  alert('getting models up');
        });
    }

    iniSocket(){
         var that = this;
          var url = 'http://'+window.location.hostname+':3003';
          var socket = io(url);
         socket.on('newPlcAlert', function(data){
           console.log("got new alert---",data);
           if(data && data.pl && data.pl.alert){
               that.alertsList.unshift(data.pl.alert);
               that.alertGroups =  _.groupBy(that.alertsList,'atype');
           }
         });
      }



      initSelect(){

        var that = this;
        setTimeout(_=>{
             jQuery('select').material_select();
             jQuery('select.select-year').change(function(e){
                       that.statYearSelected(e);
             });

             jQuery('select.select-month').change(function(e){
                 that.statMothSelected(e);
             });
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
        this.days = [];
        var y = year||new Date().getFullYear();
        var m = month || new Date().getMonth() + 1;
        var numDays = this.lib.daysInMonth(y,m);
        for (let i = 0; i <numDays; i++) {
            this.days.push(i+1);
        }

        console.log("this.days----",this.days);
      }

      statYearSelected(event){

        console.log('year changed1----',event.target.value);
            this.currentStatSelectedYear = event.target.value;
      }

      statMothSelected(event){
            console.log('month changed1----',event.target.value);
            this.currentStatSelectedMonth = event.target.value;
            this.setDaysOfMonth(this.currentStatSelectedYear,  this.currentStatSelectedMonth);
      }




      showDetailModal(alert){
        console.log("selected alert----",alert);
        this.detailmodal.selectedtab = 1;
        var that = this;
        var d = new Date();
        this.currentStatSelectedYear = d.getFullYear();
        this.currentStatSelectedMonth = d.getMonth()+1;
        // jQuery('select.select-month').val(this.currentStatSelectedMonth);
        // jQuery('select.select-year').val(this.currentStatSelectedYear);

        jQuery("#alertDetailsModal").openModal({
             ready: function() {
                  that.initGrapth();
                  that.initSelect();
              }
        });
      }

      getPlcStats(year,month){
        this.statsData = [];
        console.log('get plc stats----', year,month);
        this.request.get('/plc/stats/'+year+'/'+month+'.json').subscribe(resp => {
          console.log("plc stats-----",resp);
          if(resp&&resp.pl&&resp.pl.plc){
              this.statsData = resp.pl.plc;
          }
        });
      }

      computeStats(){
          this.getPlcStats(this.currentStatSelectedYear,this.currentStatSelectedMonth);
      }


      // code for detail modal
      showByDay(){
          // alert('by day');
          console.log("by day");
          this.isShowByDay = true;
          var d = new Date();
          this.currentStatSelectedYear = d.getFullYear();
          this.currentStatSelectedMonth = d.getMonth()+1;


         // re-initialize material-select
          this.setDaysOfMonth(null,null);
          this.computeStats();
          setTimeout(_=>{
            jQuery('.select-year').val(this.currentStatSelectedYear);
            jQuery('.select-month').val(this.currentStatSelectedMonth);
            this.initSelect();
          });

      }

      showByMonth(){
          // alert('by month');
          console.log("by month");

          this.isShowByDay = false;
          var d = new Date();
          this.currentStatSelectedYear = d.getFullYear();
          this.currentStatSelectedMonth =  0;

         // re-initialize material-select
          this.currentSelect = this.years;
          this.computeStats();
          setTimeout(_=>{
            jQuery('.select-year').val(this.currentStatSelectedYear);
            this.initSelect();
          });
      }

      initGrapth(){

        var that = this;

      }
 }
