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
var routerNav_service_1 = require("../services/routerNav.service");
var MainComponent = (function () {
    function MainComponent(routerNavServ) {
        this.routerNavServ = routerNavServ;
        console.log("MainComponent is up and running");
    }
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: 'main',
        template: '<router-outlet></router-outlet>'
        // directives: [ROUTER_DIRECTIVES,CORE_DIRECTIVES],
    })
    // @RouteConfig([
    //   {path:'/', component:LoginComponent, name:'Login'},
    //   {path:'/admin/...', component:AdminComponent, name:'Admin'}
    // ])
    ,
    __metadata("design:paramtypes", [routerNav_service_1.routerNavService])
], MainComponent);
exports.MainComponent = MainComponent;
