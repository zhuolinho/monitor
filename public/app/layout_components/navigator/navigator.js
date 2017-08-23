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
var config_1 = require("../../config");
var user_service_1 = require("../../services/user.service");
var Navigator = (function () {
    function Navigator(localUserService) {
        this.localUserService = localUserService;
        this.user = this.localUserService.getUser();
        this.navigations = [
            { link: ['/admin/home/alerts'], title: '首页', icon: 'dist/images/home.png', class: 'home-icon' },
            { link: ['/admin/monitor/gas'], title: '实时监控', icon: 'dist/images/monitor.png', class: 'monitor-icon' },
            { link: ['/admin/gps/shipments'], title: 'GPS ', icon: 'dist/images/gps.png', class: 'gps-icon' },
            { link: ['/admin/settings/auth'], title: '设置 ', icon: 'dist/images/settings.png', class: 'settings-icon' }
        ];
    }
    Navigator.prototype.ngAfterViewInit = function () {
        jQuery('.sidebar-collapse').sideNav();
        console.log('button-collapse');
    };
    return Navigator;
}());
Navigator = __decorate([
    core_1.Component({
        selector: 'navigator',
        templateUrl: config_1.config.prefix + 'layout_components/navigator/navigator.html',
        // directives: [RouterLink, ROUTER_DIRECTIVES,CORE_DIRECTIVES],
        styleUrls: [config_1.config.prefix + 'layout_components/navigator/resources/css/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], Navigator);
exports.Navigator = Navigator;
