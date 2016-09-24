System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var RequestService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            RequestService = (function () {
                function RequestService(httpService) {
                    this.httpService = httpService;
                    this.http = httpService;
                    // this.paramOptions = new RequestOptions({ headers: this.paramHeaders});
                }
                RequestService.prototype.get = function (path) {
                    return this.http.get(path, this.getHeaders()).map(function (response) {
                        return response.json();
                    });
                };
                RequestService.prototype.post = function (path, data) {
                    return this.http.post(path, JSON.stringify(data), this.getHeaders()).map(function (response) {
                        var r = response.json();
                        return r;
                    });
                };
                RequestService.prototype.put = function (path, data) {
                    return this.http.put(path, JSON.stringify(data), this.getHeaders()).map(function (response) {
                        var r = response.json();
                        return r;
                    });
                };
                RequestService.prototype.getUser = function () {
                    return JSON.parse(sessionStorage.getItem('user'));
                };
                RequestService.prototype.getHeaders = function () {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
                    this.paramOptions = new http_1.RequestOptions({ headers: headers });
                    var user = this.getUser();
                    this.paramOptions.headers.append('user', JSON.stringify(user));
                    return this.paramOptions;
                };
                RequestService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RequestService);
                return RequestService;
            }());
            exports_1("RequestService", RequestService);
        }
    }
});
