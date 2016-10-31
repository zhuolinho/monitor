System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var plcAddress;
    return {
        setters:[],
        execute: function() {
            plcAddress = (function () {
                function plcAddress() {
                    this.code = '';
                    this.cn = '';
                    this.addr = '';
                    this.at = '';
                    this.plcip1 = '';
                    this.plcip2 = '';
                    this.tank = '';
                }
                return plcAddress;
            }());
            exports_1("plcAddress", plcAddress);
            ;
        }
    }
});
