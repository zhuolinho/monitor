"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var request_service_1 = require("../../../services/request.service");
var HomeProcssedAlerts = (function () {
    function HomeProcssedAlerts(request) {
        var _this = this;
        this.request = request;
        this.months = [
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
        this.alertsList = [];
        this.expandedIndex = 0;
        this.currentTankMovingAlert = {};
        console.log("Home processed alerts is up and running");
        var self = this;
        var d = new Date();
        this.selectedMonth = d.getMonth() + 1;
        this.request.get("/plc/alerts/processed.json").subscribe(function (res) {
            if (res.pl && res.pl.alerts) {
                _this.alertStorage = res.pl.alerts;
                _this.shapeData(_.filter(_this.alertStorage, { m: _this.selectedMonth + "" }));
            }
            _this.initCollapse();
            _this.initSelect();
        });
    }
    HomeProcssedAlerts.prototype.shapeData = function (alerts) {
        var self = this;
        this.alertsList = [];
        var groupObj = _.groupBy(alerts, "atype");
        config_1.config.alertTypes.forEach(function (key, index) {
            var group = {
                groupName: key,
                groupId: index + 1,
                data: groupObj[key] || []
            };
            self.alertsList.push(group);
        });
    };
    HomeProcssedAlerts.prototype.veSelected = function (event, comp) {
        var temp = _.filter(comp.alertStorage, { m: event.target.value });
        comp.selectedMonth = event.target.value;
        comp.expandedIndex = event.target.id.split("-index-")[1];
        comp.shapeData(temp);
        this.initCollapse();
        this.initSelect();
    };
    HomeProcssedAlerts.prototype.initCollapse = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery(".collapsible").collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        }, 0);
    };
    HomeProcssedAlerts.prototype.initSelect = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery("select").material_select();
            jQuery("select").on("change", function (event) {
                that.veSelected(event, that);
            });
        }, 0);
    };
    HomeProcssedAlerts.prototype.showTankMovingModal = function (alert) {
        console.log("selected alert----", alert);
        this.currentTankMovingAlert = alert;
        jQuery("#returnAlertDetailModal").openModal({
            ready: function () {
                // jQuery('select').material_select();
            }
        });
    };
    HomeProcssedAlerts.prototype.download = function (data) {
        this.request
            .post("/plc/download/alerts/processed.json", { data: data })
            .subscribe(function (res) {
            console.log("res-----", res);
            window.location = res.pl.file;
        });
    };
    return HomeProcssedAlerts;
}());
HomeProcssedAlerts = __decorate([
    core_1.Component({
        selector: "home-processed-alerts",
        templateUrl: config_1.config.prefix +
            "/components/home/alerts_processed/home.alerts.processed.component.html"
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], HomeProcssedAlerts);
exports.HomeProcssedAlerts = HomeProcssedAlerts;
