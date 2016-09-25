System.register(['@angular/router', '../components/login/login.component', '../components/admin/admin.component', '../components/home/home.component', '../components/monitor/monitor.component', '../components/gps/gps.component', '../components/settings/settings.component', '../components/home/alerts/home.alerts.component', '../components/home/alerts_processed/home.alerts.processed.component', '../components/gps/map/shipment-map.component', '../components/gps/processed/processed-shipment.component', '../components/gps/shipment/shiment.component', '../components/monitor/gas/gas.component', '../components/monitor/camera/camera.component', '../components/settings/sms/settings-sms.component', '../components/settings/auth/settings-auth.component', '../components/settings/access/settings-access.component', '../components/settings/address/settings-address.component', '../components/settings/formula/settings-formula.component', '../components/settings/offline_users/settings-offline-users.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, login_component_1, admin_component_1, home_component_1, monitor_component_1, gps_component_1, settings_component_1, home_alerts_component_1, home_alerts_processed_component_1, shipment_map_component_1, processed_shipment_component_1, shiment_component_1, gas_component_1, camera_component_1, settings_sms_component_1, settings_auth_component_1, settings_access_component_1, settings_address_component_1, settings_formula_component_1, settings_offline_users_component_1;
    var ROUTES, globalRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
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
            ROUTES = [
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
                { path: 'admin', component: admin_component_1.AdminComponent, children: [
                        { path: 'home', component: home_component_1.Home, children: [
                                { path: 'alerts', component: home_alerts_component_1.HomeAlerts },
                                { path: 'processed-alerts', component: home_alerts_processed_component_1.HomeProcssedAlerts },
                                { path: '**', component: home_alerts_component_1.HomeAlerts }
                            ] },
                        { path: 'monitor', component: monitor_component_1.Monitor, children: [
                                { path: 'gas', component: gas_component_1.Gas },
                                { path: 'camera', component: camera_component_1.Camera },
                                { path: '**', component: gas_component_1.Gas }
                            ] },
                        { path: 'gps', component: gps_component_1.Gps, children: [
                                { path: 'shipments', component: shiment_component_1.Shipment },
                                { path: 'shipment-map/:tank', component: shipment_map_component_1.ShipmentMap },
                                { path: 'processed-shipments', component: processed_shipment_component_1.ProcessedShipment },
                                { path: '**', component: shiment_component_1.Shipment }
                            ] },
                        { path: 'settings', component: settings_component_1.Settings, children: [
                                { path: 'auth', component: settings_auth_component_1.SettingsAuth },
                                { path: 'sms', component: settings_sms_component_1.SettingsSms },
                                { path: 'access', component: settings_access_component_1.SettingsAccess },
                                { path: 'address', component: settings_address_component_1.SettingsAddress },
                                { path: 'offline-users', component: settings_offline_users_component_1.SettingsOfflineUsers },
                                { path: 'formula', component: settings_formula_component_1.SettingsFormula },
                                { path: '**', component: settings_auth_component_1.SettingsAuth }
                            ] },
                        { path: '**', component: home_component_1.Home }
                    ] },
                { path: '**', component: login_component_1.LoginComponent }
            ];
            // export const globalRouterProviders: any[]  = [
            //   //provideRouter(ROUTES)
            // ];
            exports_1("globalRouting", globalRouting = router_1.RouterModule.forRoot(ROUTES));
        }
    }
});
