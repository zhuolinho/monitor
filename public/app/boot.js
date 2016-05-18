System.register(['angular2/platform/browser', './components/main.component', 'angular2/core', './services/app-injector', './services/user.service', './services/request.service', './services/settings.service', 'angular2/http', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, main_component_1, core_1, app_injector_1, user_service_1, request_service_1, settings_service_1, http_1, router_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(main_component_1.MainComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                request_service_1.RequestService,
                user_service_1.UserService,
                settings_service_1.SettingsService
            ]).then(function (appRef) {
                // store a reference to the injector
                app_injector_1.appInjector(appRef.injector);
            });
        }
    }
});
//
// bootstrap(App, [
//   Auth,
//   HTTP_PROVIDERS, ROUTER_PROVIDERS,
//   bind(LocationStrategy).toClass(HashLocationStrategy)
// ]).then((appRef) => {
//   // store a reference to the injector
//   appInjector(appRef.injector);
// });
