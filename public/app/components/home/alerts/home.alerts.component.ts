
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {HomeAlertsDetail} from './details/home.alerts.detail.component';
import {HomeReturnAlertsDetail} from './return_details/home.return.alerts.detail.component';
import {AlertModel} from '../../../models/alert-model';
import {RequestService} from '../../../services/request.service';
import {UserService} from '../../../services/user.service';
import {CORE_DIRECTIVES} from 'angular2/common';
import {LibService} from '../../../services/lib.service';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html',
  directives:[HomeAlertsDetail,HomeReturnAlertsDetail,CORE_DIRECTIVES]
})

export class HomeAlerts{

    // alertsList:any[]=[
    //     {
    //       name:'C002-闸北区大宁路335号XX站',
    //       id:'6848',
    //       type:'余量报警',
    //       remainingTime:'2小时02分',
    //       upTime:'15.5.3-13:02/----',
    //       processed:false,
    //       alertTime:'5.5.3-13:02',
    //       alertValue:'6%/12kg/hps',
    //       processedAgent:'234'
    //     },
    //     {
    //       name:'C003-闸北区大宁路335号XX站',
    //       id:'6848',
    //       type:'余量报警',
    //       remainingTime:'2小时02分',
    //       upTime:'15.5.3-13:02/----',
    //       processed:true,
    //       alertTime:'5.5.3-13:02',
    //       alertValue:'6%/12kg/hps'
    //     },
    //     {
    //       name:'C004-闸北区大宁路335号XX站',
    //       id:'6832',
    //       type:'信号中断',
    //       remainingTime:'',
    //       upTime:'15.5.3-13:02/----',
    //       processed:false,
    //       alertTime:'5.5.3-13:02',
    //       alertValue:'信号中断'
    //     }
    //     ,  {
    //         name:'C005-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'信号中断',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:true,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'信号中断'
    //       },
    //       {
    //         name:'C006-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'信号中断',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'信号中断'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'信号中断',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'信号中断'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'泄漏报警',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'泄漏报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'泄漏报警',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'泄漏报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'压力报警',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'压力报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'压力报警',
    //         remainingTime:'',
    //         upTime:'15.5.3-13:02/----',
    //         processed:true,
    //         alertTime:'5.5.3-13:02',
    //         alertValue:'压力报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'拉回报警',
    //         selectedTanks:['J1235','J6245','C27456','C7245','C1935','C92342','C82345','C63245','C63245'],
    //         processed:false,
    //         alertTime:'5.5.3-13:02',
    //         processedAgent:'267',
    //         alertValue:'拉回报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号XX站',
    //         id:'6832',
    //         type:'拉回报警',
    //         selectedTanks:['D12345','D62545','D27456','D72145','D19345','D92342','D82345','D63245','D63245','D63245'],
    //         processed:true,
    //         alertTime:'5.5.2-11:00',
    //         processedAgent:'428',
    //         alertValue:'拉回报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号',
    //         id:'1111',
    //         type:'进场报警',
    //         selectedTanks:['D82345','J62545','J27456','J72145','J19345','C92342','C82345','C63245','C63245','C63245','C63245','C63245','C63245','D63245'],
    //         processed:false,
    //         alertTime:'5.2.10-16:01',
    //         processedAgent:'223',
    //         alertValue:'进场报警'
    //       },
    //       {
    //         name:'C007-闸北区大宁路335号',
    //         id:'3333',
    //         type:'进场报警',
    //         selectedTanks:['C22345','C6666','8889','C72145','C19345','J92342','J82345','J63245','J3245','J3245','J3245','D3245','G3645','C9245'],
    //         processed:true,
    //         alertTime:'5.2.10-16:01',
    //         processedAgent:'888',
    //         alertValue:'进场报警'
    //       }
    //
    //
    // ];  //todo user flag and ng if to hide when filtering;

    currentSort:string = 'all';

    alertsList:any[] = [];
    alertGroups:any;

    user:any;

    constructor(private request:RequestService, private userSrvc:UserService, private libSrvc:LibService){
    console.log("Home alerts is up and running");
      var self = this;
      this.user = this.userSrvc.getUser();
      console.log("this.user----",this.user);
      this.request.get('/plc/alerts/unprocessed').subscribe(res => {
        if(res.pl && res.pl.alerts){
            this.alertsList = res.pl.alerts;
            console.log("this.alertsList---",this.alertsList);


            this.alertGroups =  _.groupBy(this.alertsList,'atype');

            console.log("this.alertGroups----",this.alertGroups['余量报警']);
              //
              // config.alertTypes.forEach(function(key,index){
              //   var group = {groupName:key,groupId:index+1,data:groupObj[key]||[]};
              //   self.alertsList.push(group);
              // });
        }
        this.initUi();
      });

      // /plc/alerts/all
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
      alert.pt = this.libSrvc.dateTime();
      alert.status = 1;
      alert.pa = this.user.an;

      this.request.put('/plc/alert', alert).subscribe(res => {
          console.log("alert updated",res);
      });
    }
    initUi(){
      var _this = this;
        setTimeout(_=>{
            jQuery('.modal-trigger').leanModal({
                 dismissible: true, // Modal can be dismissed by clicking outside of the modal
                 opacity: .5, // Opacity of modal background
                 in_duration: 300, // Transition in duration
                 out_duration: 200, // Transition out duration
                 ready: function() { console.log('Ready');  _this.initSelect()}, // Callback for Modal open
                 complete: function() { console.log('Closed'); } // Callback for Modal close
           });
          //  alert('getting models up');
        });
    }

    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });

    }
 }
