System.register(['angular2/core', '../../../../config', './alerts.table'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_1, alerts_table_1;
    var HomeAlertsDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (alerts_table_1_1) {
                alerts_table_1 = alerts_table_1_1;
            }],
        execute: function() {
            HomeAlertsDetail = (function () {
                function HomeAlertsDetail() {
                    this.tableByday = [{ code: 'C002', date: '1月1号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月2号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月3号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月4号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月5号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月6号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月7号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月8号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月9号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月10号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月11号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月12号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月13号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月14号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月15号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月16号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月17号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月18号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月19号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月20号', if: 0.0000, af: 0.0000, mf: 0.0000 }
                    ];
                    this.tableByMonth = [
                        { code: 'C002', date: '1月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '2月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '3月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '4月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '5月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '6月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '7月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '8月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '9月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '10月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '11月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '12月份', if: 0.0000, af: 0.0000, mf: 0.0000 }
                    ];
                    this.months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                    this.years = ['2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年'];
                    this.days = ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日',
                        '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日',
                        '25日', '26日', '27日', '28日', '29日', '30日', '31日'
                    ];
                    this.selectedtab = 1; //to switch tabs, the rest is controlled on the page
                    console.log("Home alerts detail is up and running---");
                    this.showByDay();
                }
                Object.defineProperty(HomeAlertsDetail.prototype, "table", {
                    get: function () { return this._table; },
                    set: function (table) {
                        this._table = table;
                    },
                    enumerable: true,
                    configurable: true
                });
                HomeAlertsDetail.prototype.showByDay = function () {
                    // alert('by day');
                    this.currentTable = this.tableByday;
                    this.currentSelect = this.months;
                    this.initSelect();
                };
                HomeAlertsDetail.prototype.showByMonth = function () {
                    //  alert('by month');
                    this.currentTable = this.tableByMonth;
                    this.currentSelect = this.years;
                    this.initSelect();
                };
                HomeAlertsDetail.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                __decorate([
                    core_1.Input('table'), 
                    __metadata('design:type', alerts_table_1.AlertsTable), 
                    __metadata('design:paramtypes', [alerts_table_1.AlertsTable])
                ], HomeAlertsDetail.prototype, "table", null);
                HomeAlertsDetail = __decorate([
                    core_1.Component({
                        selector: 'home-alerts-detail',
                        templateUrl: config_1.config.prefix + '/components/home/alerts/details/home.alerts.detail.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeAlertsDetail);
                return HomeAlertsDetail;
            }());
            exports_1("HomeAlertsDetail", HomeAlertsDetail);
        }
    }
});