"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var router_service_1 = require("./services/router.service");
var main_component_1 = require("./components/main.component");
var login_component_1 = require("./components/login/login.component");
var admin_component_1 = require("./components/admin/admin.component");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./services/user.service");
var request_service_1 = require("./services/request.service");
var settings_service_1 = require("./services/settings.service");
var lib_service_1 = require("./services/lib.service");
var rt_messages_service_1 = require("./services/rt-messages.service");
//layout
var header_1 = require("./layout_components/header/header");
var navigator_1 = require("./layout_components/navigator/navigator");
var footer_1 = require("./layout_components/footer/footer");
//admin
var home_component_1 = require("./components/home/home.component");
var monitor_component_1 = require("./components/monitor/monitor.component");
var gps_component_1 = require("./components/gps/gps.component");
var settings_component_1 = require("./components/settings/settings.component");
//admin home
var home_alerts_component_1 = require("./components/home/alerts/home.alerts.component");
var home_alerts_processed_component_1 = require("./components/home/alerts_processed/home.alerts.processed.component");
// admin gps
var shipment_map_component_1 = require("./components/gps/map/shipment-map.component");
var processed_shipment_component_1 = require("./components/gps/processed/processed-shipment.component");
var shiment_component_1 = require("./components/gps/shipment/shiment.component");
//admin monitor
var gas_component_1 = require("./components/monitor/gas/gas.component");
var camera_component_1 = require("./components/monitor/camera/camera.component");
var isolated_monitor_component_1 = require("./components/monitor/isolated-monitor/isolated-monitor.component");
//admin gas-stats
var gas_stats_component_1 = require("./components/monitor/gas-stats/gas-stats.component");
//admin settings
var settings_sms_component_1 = require("./components/settings/sms/settings-sms.component");
var settings_auth_component_1 = require("./components/settings/auth/settings-auth.component");
var settings_access_component_1 = require("./components/settings/access/settings-access.component");
var settings_address_component_1 = require("./components/settings/address/settings-address.component");
var settings_formula_component_1 = require("./components/settings/formula/settings-formula.component");
var settings_offline_users_component_1 = require("./components/settings/offline_users/settings-offline-users.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
            isolated_monitor_component_1.IsolatedMonitor,
            gas_stats_component_1.GasStats,
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
    })
], AppModule);
exports.AppModule = AppModule;
