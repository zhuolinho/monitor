"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var router_guard_service_1 = require("./router-guard.service");
//main components
var login_component_1 = require("../components/login/login.component");
var admin_component_1 = require("../components/admin/admin.component");
//admin components
var home_component_1 = require("../components/home/home.component");
var monitor_component_1 = require("../components/monitor/monitor.component");
var gps_component_1 = require("../components/gps/gps.component");
var settings_component_1 = require("../components/settings/settings.component");
//admin home components
var home_alerts_component_1 = require("../components/home/alerts/home.alerts.component");
var home_alerts_processed_component_1 = require("../components/home/alerts_processed/home.alerts.processed.component");
//admin gps components
var shipment_map_component_1 = require("../components/gps/map/shipment-map.component");
var processed_shipment_component_1 = require("../components/gps/processed/processed-shipment.component");
var shiment_component_1 = require("../components/gps/shipment/shiment.component");
//admin monitor components
var gas_component_1 = require("../components/monitor/gas/gas.component");
var isolated_monitor_component_1 = require("../components/monitor/isolated-monitor/isolated-monitor.component");
var camera_component_1 = require("../components/monitor/camera/camera.component");
//admin gas stats
var gas_stats_component_1 = require("../components/monitor/gas-stats/gas-stats.component");
//admin settings components
var settings_sms_component_1 = require("../components/settings/sms/settings-sms.component");
var settings_auth_component_1 = require("../components/settings/auth/settings-auth.component");
var settings_access_component_1 = require("../components/settings/access/settings-access.component");
var settings_address_component_1 = require("../components/settings/address/settings-address.component");
var settings_formula_component_1 = require("../components/settings/formula/settings-formula.component");
var settings_offline_users_component_1 = require("../components/settings/offline_users/settings-offline-users.component");
var tanks_component_1 = require("../components/settings/tanks/tanks.component");
var ROUTES = [
    // { path: 'register', component: cbosRegister},
    // { path: 'desktop', component: cbosDesktop, children:[
    // {path: '', component: cbosDesktopTools},
    // {path: 'news/:newsID', component:cbosCompanyNewsDetails},
    // {path: 'settings', component: cbosAppSettings, children:[
    //           {path: '', component: cbosSettingsDefaultComponent},
    //           {path: 'tables/:tableID/forms/:formUfid/records/:recordUfid', component: cbosFormRuntime},
    //           {path: '**', component: cbosSettingsDefaultComponent}
    // ]},
    //   {path:'/home/...', component:Home, name:'Home', useAsDefault:true},
    //   {path:'/monitor/...', component:Monitor, name:'Monitor'},
    //   {path:'/gps/...', component:Gps, name:'Gps'},
    //   {path:'/settings/...', component:Settings, name:'Settings'}
    //   {path:'/', component:LoginComponent, name:'Login'},
    //   {path:'/admin/...', component:AdminComponent, name:'Admin'}
    //   },
    // ]},
    { path: '', component: login_component_1.LoginComponent },
    {
        path: 'admin', component: admin_component_1.AdminComponent, children: [
            {
                path: 'home', component: home_component_1.Home, children: [
                    { path: 'alerts', component: home_alerts_component_1.HomeAlerts },
                    { path: 'processed-alerts', component: home_alerts_processed_component_1.HomeProcssedAlerts },
                    { path: '**', component: home_alerts_component_1.HomeAlerts }
                ]
            },
            {
                path: 'monitor', component: monitor_component_1.Monitor, children: [
                    { path: 'gas', component: gas_component_1.Gas },
                    { path: 'camera', component: camera_component_1.Camera },
                    { path: 'gas-stats', component: gas_stats_component_1.GasStats },
                    { path: '**', component: gas_component_1.Gas }
                ]
            },
            {
                path: 'gps', component: gps_component_1.Gps, children: [
                    { path: 'shipments', component: shiment_component_1.Shipment },
                    { path: 'shipment-map/:tank', component: shipment_map_component_1.ShipmentMap },
                    { path: 'processed-shipments', component: processed_shipment_component_1.ProcessedShipment },
                    { path: '**', component: shiment_component_1.Shipment }
                ]
            },
            {
                path: 'settings', component: settings_component_1.Settings, children: [
                    { path: 'auth', component: settings_auth_component_1.SettingsAuth },
                    {
                        path: 'sms',
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ],
                        component: settings_sms_component_1.SettingsSms
                    },
                    {
                        path: 'access',
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ],
                        component: settings_access_component_1.SettingsAccess
                    },
                    {
                        path: 'address',
                        component: settings_address_component_1.SettingsAddress,
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ]
                    },
                    {
                        path: 'offline-users',
                        component: settings_offline_users_component_1.SettingsOfflineUsers,
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ]
                    },
                    {
                        path: 'formula',
                        component: settings_formula_component_1.SettingsFormula,
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ]
                    },
                    {
                        path: 'tanks',
                        component: tanks_component_1.SettingsTank,
                        canActivate: [
                            router_guard_service_1.CanActivateViaAuthGuard
                        ]
                    },
                    { path: '**', component: settings_auth_component_1.SettingsAuth }
                ]
            },
            { path: '**', component: home_component_1.Home }
        ]
    },
    { path: 'view/tank-stats/:tankId', component: isolated_monitor_component_1.IsolatedMonitor },
    { path: '**', component: login_component_1.LoginComponent }
];
// export const globalRouterProviders: any[]  = [
//   //provideRouter(ROUTES)
// ];
exports.globalRouting = router_1.RouterModule.forRoot(ROUTES);
