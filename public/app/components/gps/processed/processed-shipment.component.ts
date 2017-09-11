
import { Component } from '@angular/core';
import { config } from '../../../config';
import { RequestService } from '../../../services/request.service';
declare var jQuery: any;
declare var _: any;
declare var window: any;

@Component({
  selector: 'processed-shipment',
  templateUrl: config.prefix + '/components/gps/processed/processed-shipment.component.html'
})

export class ProcessedShipment {
  shipments: any[] = [];
  shimentStorage: any[] = [];
  selectedMonth: number;
  expandedIndex: number = 0;
  months: string[] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  constructor(private request: RequestService) {
    let d = new Date();
    this.selectedMonth = d.getMonth() + 1;

    console.log("processed-shipment is up and running");
    this.request.get('/gps/shipments/done.json').subscribe(res => {
      console.log("res ---", res);
      if (res && res.pl && res.pl.shipments) {
        if (res.pl && res.pl.shipments) {
          this.shimentStorage = res.pl.shipments;
          this.shapeData(_.filter(this.shimentStorage, { m: this.selectedMonth }));
        }

        this.initCollapse();
        this.initSelect();
      }
    });
  }

  shapeData(param) {
    var self = this;
    this.shipments = [];
    var groupObj = _.groupBy(param, 'ntt');
    config.alertTypes.forEach(function(key, index) {
      var group = { groupName: key, groupId: index + 1, data: groupObj[key] || [] };
      self.shipments.push(group);
    });
  }

  veSelected(event, comp) {
    var temp = _.filter(comp.alertStorage, { m: event.target.value });
    comp.selectedMonth = event.target.value;
    comp.expandedIndex = event.target.id.split('-index-')[1];
    comp.shapeData(temp);
    this.initCollapse();
    this.initSelect();
  }

  initCollapse() {
    var that = this;
    setTimeout(_ => {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    }, 0);
  }

  initSelect() {
    var that = this;
    setTimeout(_ => {
      jQuery('select').material_select();
      jQuery('select').on('change', function(event) {
        that.veSelected(event, that);
      });
    }, 0);
  }


  downloadData() {
    this.request.post('/gps/shipment/complete/download.json', {}).subscribe(res => {
      console.log("res-----", res);
      window.location = res.pl.file;
    });
  }
}




  // testShipments:any[]=[{
  //   groupId:1,
  //   groupName:"CNG",
  //   data:[{
  //     oti:'C002-6328',
  //     nti:'6328',
  //     dt:'5.2-14:33',
  //     at:'5.2-23:10',
  //     lp:'2632',
  //     driver:'761',
  //     s:'822',
  //     pa:'310',
  //     dist:'12.2'
  //   },
  //   {
  //     oti:'C002-6328',
  //     nti:'6328',
  //     dt:'5.2-14:33',
  //     at:'5.2-23:10',
  //     lp:'2632',
  //     driver:'761',
  //     s:'822',
  //     pa:'310',
  //     dist:'12.2'
  //   }
  //   ]},
  //
  //   {
  //     groupId:2,
  //     groupName:"LNG",
  //     data:[{
  //       oti:'C002-6328',
  //       nti:'6328',
  //       dt:'5.2-14:33',
  //       at:'5.2-23:10',
  //       lp:'2632',
  //       driver:'761',
  //       s:'822',
  //       pa:'310',
  //       dist:'12.2'
  //     },
  //     {
  //       oti:'C002-6328',
  //       nti:'6328',
  //       dt:'5.2-14:33',
  //       at:'5.2-23:10',
  //       lp:'2632',
  //       driver:'761',
  //       s:'822',
  //       pa:'310',
  //       dist:'12.2'
  //     }
  //     ]},
  //
  //     {
  //       groupId:3,
  //       groupName:'集格',
  //       data:[{
  //         oti:'C002-6328',
  //         nti:'6328',
  //         dt:'5.2-14:33',
  //         at:'5.2-23:10',
  //         lp:'2632',
  //         driver:'761',
  //         s:'822',
  //         pa:'310',
  //         dist:'12.2'
  //       },
  //       {
  //         oti:'C002-6328',
  //         nti:'6328',
  //         dt:'5.2-14:33',
  //         at:'5.2-23:10',
  //         lp:'2632',
  //         driver:'761',
  //         s:'822',
  //         pa:'310',
  //         dist:'12.2'
  //       }
  //       ]},
  //
  //       {
  //         groupId:4,
  //         groupName:'杜瓦瓶',
  //         data:[{
  //           oti:'C002-6328',
  //           nti:'6328',
  //           dt:'5.2-14:33',
  //           at:'5.2-23:10',
  //           lp:'2632',
  //           driver:'761',
  //           s:'822',
  //           pa:'310',
  //           dist:'12.2'
  //         },
  //         {
  //           oti:'C002-6328',
  //           nti:'6328',
  //           dt:'5.2-14:33',
  //           at:'5.2-23:10',
  //           lp:'2632',
  //           driver:'761',
  //           s:'822',
  //           pa:'310',
  //           dist:'12.2'
  //         }
  //         ]},
  //
  //         {
  //           groupId:5,
  //           groupName:'进场',
  //           data:[{
  //             oti:'C002-6328',
  //             nti:'6328',
  //             dt:'5.2-14:33',
  //             at:'5.2-23:10',
  //             lp:'2632',
  //             driver:'761',
  //             s:'822',
  //             pa:'310',
  //             dist:'12.2'
  //           },
  //           {
  //             oti:'C002-6328',
  //             nti:'6328',
  //             dt:'5.2-14:33',
  //             at:'5.2-23:10',
  //             lp:'2632',
  //             driver:'761',
  //             s:'822',
  //             pa:'310',
  //             dist:'12.2'
  //           }
  //           ]},
  //
  //           {
  //             groupId:6,
  //             groupName:'拉回',
  //             data:[{
  //               oti:'C002-6328',
  //               nti:'6328',
  //               dt:'5.2-14:33',
  //               at:'5.2-23:10',
  //               lp:'2632',
  //               driver:'761',
  //               s:'822',
  //               pa:'310',
  //               dist:'12.2'
  //             },
  //             {
  //               oti:'C002-6328',
  //               nti:'6328',
  //               dt:'5.2-14:33',
  //               at:'5.2-23:10',
  //               lp:'2632',
  //               driver:'761',
  //               s:'822',
  //               pa:'310',
  //               dist:'12.2'
  //             }
  //             ]}
  //
  // ];
  //todo user flag and ng if to hide when filtering;
