System.register(["@angular/core"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, LibService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LibService = (function () {
                function LibService() {
                }
                // dateTime(){
                //   var rightNow = new Date();
                //   var datePart = rightNow.toISOString().slice(0,10);
                //   var timePart = rightNow.toString().slice(16,24);
                //   var result = datePart+" "+timePart;
                //   return result;
                // }
                LibService.prototype.dateTime = function () {
                    var now = new Date(), tzo = -now.getTimezoneOffset(), pad = function (num) {
                        var norm = Math.abs(Math.floor(num));
                        return (norm < 10 ? '0' : '') + norm;
                    };
                    return now.getFullYear()
                        + '-' + pad(now.getMonth() + 1)
                        + '-' + pad(now.getDate())
                        + ' ' + pad(now.getHours())
                        + ':' + pad(now.getMinutes())
                        + ':' + pad(now.getSeconds());
                };
                LibService.prototype.date = function () {
                    var rightNow = new Date();
                    var datePart = rightNow.toISOString().slice(0, 10);
                    return datePart;
                };
                LibService.prototype.daysInMonth = function (year, month) {
                    var num = new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate();
                    return num;
                };
                return LibService;
            }());
            LibService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], LibService);
            exports_1("LibService", LibService);
        }
    };
});
