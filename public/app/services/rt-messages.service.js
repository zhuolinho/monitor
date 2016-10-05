System.register(['@angular/core', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var RTMessagesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            RTMessagesService = (function () {
                function RTMessagesService() {
                    this.sockets = {};
                }
                RTMessagesService.prototype.connect = function (port) {
                    var ns = this.getUser().oID;
                    var url = 'http://' + window.location.hostname + ':' + port;
                    var socket = io(url);
                    this.sockets[ns] = socket;
                };
                RTMessagesService.prototype.on = function (eventName, callback) {
                    var that = this;
                    var ns = this.getUser().oID;
                    this.sockets[ns].on(eventName + ':' + ns, function (args) {
                        console.log("got event from socket----", args);
                        if (callback) {
                            callback(args);
                        }
                    });
                };
                RTMessagesService.prototype.emit = function (eventName, data, callback) {
                    var that = this;
                    var ns = this.getUser().oID;
                    that.sockets[ns].emit(eventName + ':' + ns, data, function (args) {
                        if (callback) {
                            callback(args);
                        }
                    });
                };
                RTMessagesService.prototype.getUser = function () {
                    return JSON.parse(sessionStorage.getItem('user'));
                };
                RTMessagesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RTMessagesService);
                return RTMessagesService;
            }());
            exports_1("RTMessagesService", RTMessagesService);
        }
    }
});
