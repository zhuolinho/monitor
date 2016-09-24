System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var Sidebar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Sidebar = (function () {
                // navigation: any[];
                function Sidebar() {
                    // console.log('app sidebar loaded...');
                    //  var righttnav = $("#chat-out").height();
                    // $('.rightside-navigation').height(righttnav).perfectScrollbar({
                    //   suppressScrollX: true
                    // });
                    // this.navigation = [
                    // 					{ icon: 'glyphicon-th', name: '主页', linkTo: ['/Home'] },
                    // 					{ icon: 'glyphicon-user', name: '用户', linkTo: ['/Users'] },
                    // 					{ icon: 'glyphicon-user', name: 'SHOP', linkTo: ['/Shop']}
                    // 					];
                    // console.log('this.navigation-->>>>>----', this.navigation);
                }
                Sidebar = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                    }), 
                    __metadata('design:paramtypes', [])
                ], Sidebar);
                return Sidebar;
            }());
            exports_1("Sidebar", Sidebar);
        }
    }
});
