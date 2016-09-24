System.register(['./app-injector', './user.service', '@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_injector_1, user_service_1, router_1;
    var isLoggedIn;
    return {
        setters:[
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("isLoggedIn", isLoggedIn = function (to, from) {
                var injector = app_injector_1.appInjector();
                var userServc = injector.get(user_service_1.UserService);
                var router = injector.get(router_1.Router);
                if (userServc.getUser()) {
                    return true;
                }
                else {
                    router.navigate(['/Login']);
                    return false;
                }
            });
        }
    }
});
