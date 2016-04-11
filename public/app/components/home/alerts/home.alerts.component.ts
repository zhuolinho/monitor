
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {HomeAlertsDetail} from './details/home.alerts.detail.component';
import {AlertModel} from '../../../models/alert-model';
import {CORE_DIRECTIVES} from 'angular2/common';
declare var jQuery:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html',
  directives:[HomeAlertsDetail,CORE_DIRECTIVES]
})

export class HomeAlerts{

    alertsList:AlertModel[]=[
        {
          name:'C002-闸北区大宁路335号XX站',
          id:'6848',
          type:'余量报警',
          remainingTime:'2小时02分',
          upTime:'15.5.3-13:02/----',
          processed:false,
          alertTime:'5.5.3-13:02',
          alertValue:'6%/12kg/hps'
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
          }


    ];  //todo user flag and ng if to hide when filtering;

    constructor(){
    console.log("Home alerts is up and running");
      this.initModal();
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
