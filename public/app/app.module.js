System.register(['@angular/core', '@angular/http', '@angular/platform-browser', '@angular/common', "./services/router.service", './components/main.component', './components/login/login.component', './components/admin/admin.component', '@angular/forms', './services/user.service', './services/request.service', './services/settings.service', './services/lib.service', './services/rt-messages.service', './layout_components/header/header', './layout_components/navigator/navigator', './layout_components/footer/footer', './components/home/home.component', './components/monitor/monitor.component', './components/gps/gps.component', './components/settings/settings.component', './components/home/alerts/home.alerts.component', './components/home/alerts_processed/home.alerts.processed.component', './components/gps/map/shipment-map.component', './components/gps/processed/processed-shipment.component', './components/gps/shipment/shiment.component', './components/monitor/gas/gas.component', './components/monitor/camera/camera.component', './components/settings/sms/settings-sms.component', './components/settings/auth/settings-auth.component', './components/settings/access/settings-access.component', './components/settings/address/settings-address.component', './components/settings/formula/settings-formula.component', './components/settings/offline_users/settings-offline-users.component'], function(exports_1, context_1) {
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
    var core_1, http_1, platform_browser_1, common_1, router_service_1, main_component_1, login_component_1, admin_component_1, forms_1, user_service_1, request_service_1, settings_service_1, lib_service_1, rt_messages_service_1, header_1, navigator_1, footer_1, home_component_1, monitor_component_1, gps_component_1, settings_component_1, home_alerts_component_1, home_alerts_processed_component_1, shipment_map_component_1, processed_shipment_component_1, shiment_component_1, gas_component_1, camera_component_1, settings_sms_component_1, settings_auth_component_1, settings_access_component_1, settings_address_component_1, settings_formula_component_1, settings_offline_users_component_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_service_1_1) {
                router_service_1 = router_service_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
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
            function (lib_service_1_1) {
                lib_service_1 = lib_service_1_1;
            },
            function (rt_messages_service_1_1) {
                rt_messages_service_1 = rt_messages_service_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (navigator_1_1) {
                navigator_1 = navigator_1_1;
            },
            function (footer_1_1) {
                footer_1 = footer_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (monitor_component_1_1) {
                monitor_component_1 = monitor_component_1_1;
            },
            function (gps_component_1_1) {
                gps_component_1 = gps_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (home_alerts_component_1_1) {
                home_alerts_component_1 = home_alerts_component_1_1;
            },
            function (home_alerts_processed_component_1_1) {
                home_alerts_processed_component_1 = home_alerts_processed_component_1_1;
            },
            function (shipment_map_component_1_1) {
                shipment_map_component_1 = shipment_map_component_1_1;
            },
            function (processed_shipment_component_1_1) {
                processed_shipment_component_1 = processed_shipment_component_1_1;
            },
            function (shiment_component_1_1) {
                shiment_component_1 = shiment_component_1_1;
            },
            function (gas_component_1_1) {
                gas_component_1 = gas_component_1_1;
            },
            function (camera_component_1_1) {
                camera_component_1 = camera_component_1_1;
            },
            function (settings_sms_component_1_1) {
                settings_sms_component_1 = settings_sms_component_1_1;
            },
            function (settings_auth_component_1_1) {
                settings_auth_component_1 = settings_auth_component_1_1;
            },
            function (settings_access_component_1_1) {
                settings_access_component_1 = settings_access_component_1_1;
            },
            function (settings_address_component_1_1) {
                settings_address_component_1 = settings_address_component_1_1;
            },
            function (settings_formula_component_1_1) {
                settings_formula_component_1 = settings_formula_component_1_1;
            },
            function (settings_offline_users_component_1_1) {
                settings_offline_users_component_1 = settings_offline_users_component_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            http_1.HttpModule,
                            router_service_1.globalRouting
                        ],
                        declarations: [
                            main_component_1.MainComponent,
                            login_component_1.LoginComponent,
                            admin_component_1.AdminComponent,
                            header_1.Header,
                            navigator_1.Navigator,
                            footer_1.Footer,
                            home_component_1.Home,
                            monitor_component_1.Monitor,
                            gps_component_1.Gps,
                            settings_component_1.Settings,
                            home_alerts_component_1.HomeAlerts,
                            home_alerts_processed_component_1.HomeProcssedAlerts,
                            shipment_map_component_1.ShipmentMap,
                            processed_shipment_component_1.ProcessedShipment,
                            shiment_component_1.Shipment,
                            gas_component_1.Gas,
                            camera_component_1.Camera,
                            settings_sms_component_1.SettingsSms,
                            settings_auth_component_1.SettingsAuth,
                            settings_access_component_1.SettingsAccess,
                            settings_address_component_1.SettingsAddress,
                            settings_formula_component_1.SettingsFormula,
                            settings_offline_users_component_1.SettingsOfflineUsers
                        ],
                        providers: [
                            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                            user_service_1.UserService,
                            request_service_1.RequestService,
                            settings_service_1.SettingsService,
                            rt_messages_service_1.RTMessagesService,
                            lib_service_1.LibService
                        ],
                        bootstrap: [main_component_1.MainComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
