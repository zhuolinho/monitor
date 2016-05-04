System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appInjectorRef, appInjector;
    return {
        setters:[],
        execute: function() {
            //prevent duplicating services
            exports_1("appInjector", appInjector = function (injector) {
                if (injector === void 0) { injector = false; }
                if (!injector) {
                    return appInjectorRef;
                }
                appInjectorRef = injector;
                return appInjectorRef;
            });
        }
    }
});
