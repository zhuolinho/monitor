
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {HomeAlertsDetail} from './details/home.alerts.detail.component';
import {HomeReturnAlertsDetail} from './return_details/home.return.alerts.detail.component';
import {AlertModel} from '../../../models/alert-model';
import {CORE_DIRECTIVES} from 'angular2/common';
declare var jQuery:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html',
  directives:[HomeAlertsDetail,HomeReturnAlertsDetail,CORE_DIRECTIVES]
})

export class HomeAlerts{

    alertsList:any[]=[
        {
          name:'C002-闸北区大宁路335号XX站',
          id:'6848',
          type:'余量报警',
          remainingTime:'2小时02分',
          upTime:'15.5.3-13:02/----',
          processed:false,
          alertTime:'5.5.3-13:02',
          alertValue:'6%/12kg/hps',
          processedAgent:'234'
        },
        {
          name:'C003-闸北区大宁路335号XX站',
          id:'6848',
          type:'余量报警',
          remainingTime:'2小时02分',
          upTime:'15.5.3-13:02/----',
          processed:true,
          alertTime:'5.5.3-13:02',
          alertValue:'6%/12kg/hps'
        },
        {
          name:'C004-闸北区大宁路335号XX站',
          id:'6832',
          type:'信号中断',
          remainingTime:'',
          upTime:'15.5.3-13:02/----',
          processed:false,
          alertTime:'5.5.3-13:02',
          alertValue:'信号中断'
        }
        ,  {
            name:'C005-闸北区大宁路335号XX站',
            id:'6832',
            type:'信号中断',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:true,
            alertTime:'5.5.3-13:02',
            alertValue:'信号中断'
          },
          {
            name:'C006-闸北区大宁路335号XX站',
            id:'6832',
            type:'信号中断',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:false,
            alertTime:'5.5.3-13:02',
            alertValue:'信号中断'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'信号中断',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:false,
            alertTime:'5.5.3-13:02',
            alertValue:'信号中断'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'泄漏报警',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:false,
            alertTime:'5.5.3-13:02',
            alertValue:'泄漏报警'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'泄漏报警',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:false,
            alertTime:'5.5.3-13:02',
            alertValue:'泄漏报警'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'压力报警',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:false,
            alertTime:'5.5.3-13:02',
            alertValue:'压力报警'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'压力报警',
            remainingTime:'',
            upTime:'15.5.3-13:02/----',
            processed:true,
            alertTime:'5.5.3-13:02',
            alertValue:'压力报警'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'拉回报警',
            selectedTanks:['12345','62545','27456','72145','19345','92342','82345','63245','63245','63245','63245','63245','63245','63245'],
            processed:false,
            alertTime:'5.5.3-13:02',
            processedAgent:'267',
            alertValue:'拉回报警'
          },
          {
            name:'C007-闸北区大宁路335号XX站',
            id:'6832',
            type:'拉回报警',
            selectedTanks:['12345','62545','27456','72145','19345','92342','82345','63245','63245','63245','63245','63245','63245','63245'],
            processed:true,
            alertTime:'5.5.2-11:00',
            processedAgent:'428',
            alertValue:'拉回报警'
          }


    ];  //todo user flag and ng if to hide when filtering;

    currentSort:string = 'all';

    constructor(){
    console.log("Home alerts is up and running");
      this.initModal();
    }

    veSortByShortage(){
      if(this.currentSort!='余量报警'){
        this.currentSort='余量报警';
      }
    }

    veSortBySingal(){
      if(this.currentSort!='信号中断'){
        this.currentSort='信号中断';
      }
    }

    veSortByPresure(){
      if(this.currentSort!='压力报警'){
        this.currentSort='压力报警';
      }
    }

    veSortByLeakage(){
      if(this.currentSort!='泄漏报警'){
        this.currentSort='泄漏报警';
      }
    }

    veSortByReturn(){
      if(this.currentSort!='拉回报警'){
        this.currentSort='拉回报警';
      }
    }

    veProcessed(alert){
      alert.processed = !alert.processed;
    }
    initModal(){

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
