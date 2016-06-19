
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {RequestService} from '../../../services/request.service';
declare var jQuery:any;
declare var window:any;
declare var _:any;

@Component({
  selector:'home-processed-alerts',
  templateUrl:config.prefix + '/components/home/alerts_processed/home.alerts.processed.component.html'
})

export class HomeProcssedAlerts{

  months:string[] = ['1月','2月','3月','4月'];
  selectedMonth:string='';

  // alertsList:any[]=[{
  //   groupId:1,
  //   groupName:"余量报警",
  //   data:[{
  //     code:'C002-6328',
  //     alertTime:'5.2-14:02',
  //     processedTime:'5.2-14:33',
  //     processedAgent:'2320',
  //     alertType:'余量报警',
  //     typeId:1,
  //   },
  //   {
  //     code:'C002-6379',
  //     alertTime:'5.2-14:02',
  //     processedTime:'5.6-11:20',
  //     processedAgent:'2322',
  //     alertType:'余量报警',
  //     typeId:1,
  //   }
  //   ]},
  //
  //   {
  //     groupId:2,
  //     groupName:"压力报警",
  //     data:[{
  //       code:'C003-9328',
  //       alertTime:'5.2-14:02',
  //       processedTime:'5.3-14:03',
  //       processedAgent:'2320',
  //       alertType:'压力报警',
  //       typeId:2,
  //     },
  //     {
  //       code:'C005-8370',
  //       alertTime:'5.2-14:02',
  //       processedTime:'5.1-11:12',
  //       processedAgent:'2372',
  //       alertType:'压力报警',
  //       typeId:2,
  //     }
  //     ]},
  //
  //     {
  //       groupId:3,
  //       groupName:"信号中断",
  //       data:[{
  //         code:'C004-9628',
  //         alertTime:'5.2-13:12',
  //         processedTime:'5.3-14:03',
  //         processedAgent:'4920',
  //         alertType:'信号中断',
  //         typeId:3,
  //       },
  //       {
  //         code:'C006-1379',
  //         alertTime:'5.2-12:17',
  //         processedTime:'5.1-18:30',
  //         processedAgent:'8328',
  //         alertType:'信号中断',
  //         typeId:3,
  //       },
  //       {
  //             code:'C006-1379',
  //             alertTime:'5.2-12:17',
  //             processedTime:'5.2-18:37',
  //             processedAgent:'5328',
  //             alertType:'信号中断',
  //             typeId:3,
  //           }
  //       ]},
  //
  //       {
  //         groupId:4,
  //         groupName:"泄漏报警",
  //         data:[{
  //           code:'C009-9828',
  //           alertTime:'5.2-13:12',
  //           processedTime:'5.3-14:03',
  //           processedAgent:'1977',
  //           alertType:'泄漏报警',
  //           typeId:4,
  //         },
  //         {
  //           code:'C007-8379',
  //           alertTime:'5.2-12:17',
  //           processedTime:'5.1-18:30',
  //           processedAgent:'8328',
  //           alertType:'泄漏报警',
  //           typeId:4,
  //         },
  //         {
  //               code:'C003-0379',
  //               alertTime:'5.2-12:17',
  //               processedTime:'5.2-18:37',
  //               processedAgent:'5328',
  //               alertType:'泄漏报警',
  //               typeId:4,
  //             }
  //         ]},
  //
  //         {
  //           groupId:5,
  //           groupName:"拉回报警",
  //           data:[{
  //             code:'C005-5528',
  //             alertTime:'5.2-13:12',
  //             processedTime:'5.3-14:03',
  //             processedAgent:'1997',
  //             alertType:'拉回报警',
  //             typeId:5,
  //           },
  //           {
  //             code:'C010-2279',
  //             alertTime:'4.2-12:17',
  //             processedTime:'5.1-22:32',
  //             processedAgent:'8118',
  //             alertType:'拉回报警',
  //             typeId:5,
  //           },
  //           {
  //                 code:'C022-1379',
  //                 alertTime:'5.2-12:17',
  //                 processedTime:'4.2-18:37',
  //                 processedAgent:'5668',
  //                 alertType:'拉回报警',
  //                 typeId:5,
  //               }
  //           ]},
  //
  //           {
  //             groupId:6,
  //             groupName:"进场报警",
  //             data:[{
  //               code:'C015-5528',
  //               alertTime:'5.2-13:12',
  //               processedTime:'5.6-14:03',
  //               processedAgent:'9997',
  //               alertType:'进场报警',
  //               typeId:6,
  //             },
  //             {
  //               code:'C019-2279',
  //               alertTime:'4.2-12:17',
  //               processedTime:'5.1-22:32',
  //               processedAgent:'8018',
  //               alertType:'进场报警',
  //               typeId:6,
  //             },
  //             {
  //                   code:'C102-2379',
  //                   alertTime:'5.8-22:17',
  //                   processedTime:'4.2-18:37',
  //                   processedAgent:'7668',
  //                   alertType:'进场报警',
  //                   typeId:6,
  //                 }
  //             ]}
  //
  // ];  //todo user flag and ng if to hide when filtering;


alertsList:any[] = [];

  constructor(private request:RequestService){
  console.log("Home processed alerts is up and running");
  var self = this;
    this.request.get('/plc/alerts/processed.json').subscribe(res => {
      if(res.pl && res.pl.alerts){

        console.log("res.pl.alerts",res.pl.alerts)

          var groupObj =  _.groupBy(res.pl.alerts,'atype');

         config.alertTypes.forEach(function(key,index){
            var group = {groupName:key,groupId:index+1,data:groupObj[key]||[]};
            self.alertsList.push(group);
          });
          console.log("this.alertsList---",self.alertsList);
      }
      this.initUi();
    });
  }

    veSelected(event, item){
      this.selectedMonth = event.target.value;
    }

    initUi(){
      setTimeout(_=>{
           jQuery('select').material_select();
           jQuery('select').on('change',this.veSelected);
           jQuery('.collapsible').collapsible({
             accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
           });
      });
    }

    download(){
      this.request.post('/plc/download.json',{}).subscribe(res => {
        console.log("res-----",res);
        window.location = res.pl.file;
      });
    }
 }
