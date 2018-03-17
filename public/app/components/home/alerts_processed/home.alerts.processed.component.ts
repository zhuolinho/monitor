import { Component } from "@angular/core";
import { config } from "../../../config";
import { RequestService } from "../../../services/request.service";
declare var jQuery: any;
declare var window: any;
declare var _: any;

@Component({
  selector: "home-processed-alerts",
  templateUrl:
    config.prefix +
    "/components/home/alerts_processed/home.alerts.processed.component.html"
})
export class HomeProcssedAlerts {
  months: string[] = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ];
  selectedMonth: number;
  alertStorage: any;
  alertsList: any[] = [];
  expandedIndex: number = 0;
  currentTankMovingAlert: any = {};

  constructor(private request: RequestService) {
    console.log("Home processed alerts is up and running");
    var self = this;
    let d = new Date();
    this.selectedMonth = d.getMonth() + 1;
    this.request.get("/plc/alerts/processed.json").subscribe(res => {
      if (res.pl && res.pl.alerts) {
        this.alertStorage = res.pl.alerts;
        this.shapeData(
          _.filter(this.alertStorage, { m: this.selectedMonth + "" })
        );
      }

      this.initCollapse();
      this.initSelect();
    });
  }

  shapeData(alerts) {
    var self = this;
    this.alertsList = [];
    var groupObj = _.groupBy(alerts, "atype");
    config.alertTypes.forEach(function(key, index) {
      var group = {
        groupName: key,
        groupId: index + 1,
        data: groupObj[key] || []
      };
      self.alertsList.push(group);
    });
  }

  veSelected(event, comp) {
    var temp = _.filter(comp.alertStorage, { m: event.target.value });
    comp.selectedMonth = event.target.value;
    comp.expandedIndex = event.target.id.split("-index-")[1];
    comp.shapeData(temp);
    this.initCollapse();
    this.initSelect();
  }

  initCollapse() {
    var that = this;
    setTimeout(_ => {
      jQuery(".collapsible").collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    }, 0);
  }

  initSelect() {
    var that = this;
    setTimeout(_ => {
      jQuery("select").material_select();
      jQuery("select").on("change", function(event) {
        that.veSelected(event, that);
      });
    }, 0);
  }

  showTankMovingModal(alert) {
    console.log("selected alert----", alert);
    this.currentTankMovingAlert = alert;
    jQuery("#returnAlertDetailModal").openModal({
      ready: function() {
        // jQuery('select').material_select();
      }
    });
  }

  download(data) {
    this.request
      .post("/plc/download/alerts/processed.json", { data: data })
      .subscribe(res => {
        console.log("res-----", res);
        window.location = res.pl.file;
      });
  }
}
