
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

    currentSort:string = 'all';

    alertsList:any[] = [];
    alertGroups:any;

    user:any;

    constructor(private request:RequestService, private userSrvc:UserService, private libSrvc:LibService){
    console.log("Home alerts is up and running");
      var self = this;
      this.user = this.userSrvc.getUser();
      console.log("this.user----",this.user);
      this.request.get('/plc/alerts/unprocessed.json').subscribe(res => {
        if(res.pl && res.pl.alerts){
            this.alertsList = res.pl.alerts;
            console.log("this.alertsList---",this.alertsList);
            this.alertGroups =  _.groupBy(this.alertsList,'atype');
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
      var self = this;
      alert.pt = this.libSrvc.dateTime();
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

    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });

    }
 }
