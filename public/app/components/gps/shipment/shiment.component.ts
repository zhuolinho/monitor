
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {Router} from 'angular2/router'
import {CORE_DIRECTIVES} from 'angular2/common';
import {RequestService} from '../../../services/request.service';
declare var jQuery:any;

@Component({
  selector:'shipment',
  templateUrl:config.prefix + '/components/gps/shipment/shipment.component.html',
  directives:[CORE_DIRECTIVES]
})

export class Shipment{

  // shipmentList:any[]=[
  //
  //     {
  //       name:'C002-闸北区大宁路335号XX站',
  //       id:'6848',
  //       remainingTime:'2小时02分',
  //       upTime:'15.5.3-13:02/----',
  //       processed:false,
  //       alertTime:'5.5.3-13:02',
  //       alertValue:'6%/12kg/hps'
  //     },
  //     {
  //       name:'L002-闸北区大宁路335号XX站',
  //       id:'2848',
  //       remainingTime:'2小时02分',
  //       upTime:'15.5.3-13:02/----',
  //       processed:false,
  //       alertTime:'5.5.3-13:02',
  //       alertValue:'6%/12kg/hps'
  //     },
  //     {
  //       name:'C002-闸北区大宁路335号XX站',
  //       id:'4845',
  //       remainingTime:'2小时02分',
  //       upTime:'15.5.3-13:02/----',
  //       processed:true,
  //       alertTime:'5.5.3-13:02',
  //       alertValue:'6%/12kg/hps'
  //     },
  //     {
  //       name:'C002-闸北区大宁路335号XX站',
  //       id:'4845',
  //       remainingTime:'2小时02分',
  //       upTime:'15.5.3-13:02/----',
  //       processed:false,
  //       alertTime:'5.5.3-13:02',
  //       alertValue:'6%/12kg/hps'
  //     }
  //];  //todo user flag and ng if to hide when filtering;

  shipmentList:any[] = [];

    constructor(private router:Router,
       private request:RequestService){
    console.log("Shipment is up and running");

    this.request.get("/plc/shipments").subscribe(res => {
          // console.log("res------", res);
          if(res.pl && res.pl.shipmentList){
              this.shipmentList = res.pl.shipmentList;
          }

    })

    // this.initUi();

    }


    veSubmitForShipment(alert){
      // alert.processed = !alert.processed;

      alert.status = 2;

      console.log("alert-----",alert);

      this.request.put("/plc/alert",alert).subscribe(res => {

        console.log("res----",res);
        if(res.pl && res.pl.alert && res.pl.alert.code){
          this.router.navigate(['ShipmentMap',{tank:res.pl.alert.code}]);
        }
      });
    }
 }
