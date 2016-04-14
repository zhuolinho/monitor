
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {CORE_DIRECTIVES} from 'angular2/common';
declare var jQuery:any;

@Component({
  selector:'shipment',
  templateUrl:config.prefix + '/components/gps/shipment/shipment.component.html',
  directives:[CORE_DIRECTIVES]
})

export class Shipment{

  shipmentList:any[]=[

      {
        name:'C002-闸北区大宁路335号XX站',
        id:'6848',
        remainingTime:'2小时02分',
        upTime:'15.5.3-13:02/----',
        processed:false,
        alertTime:'5.5.3-13:02',
        alertValue:'6%/12kg/hps'
      },
      {
        name:'L002-闸北区大宁路335号XX站',
        id:'2848',
        remainingTime:'2小时02分',
        upTime:'15.5.3-13:02/----',
        processed:false,
        alertTime:'5.5.3-13:02',
        alertValue:'6%/12kg/hps'
      },
      {
        name:'C002-闸北区大宁路335号XX站',
        id:'4845',
        remainingTime:'2小时02分',
        upTime:'15.5.3-13:02/----',
        processed:true,
        alertTime:'5.5.3-13:02',
        alertValue:'6%/12kg/hps'
      },
      {
        name:'C002-闸北区大宁路335号XX站',
        id:'4845',
        remainingTime:'2小时02分',
        upTime:'15.5.3-13:02/----',
        processed:false,
        alertTime:'5.5.3-13:02',
        alertValue:'6%/12kg/hps'
      }

  ];  //todo user flag and ng if to hide when filtering;

    constructor(){
    console.log("Shipment is up and running");
    // this.initUi();

    }


    veConfirm(alert){
      alert.processed = !alert.processed;

    }
 }
