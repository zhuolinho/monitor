

import {Routes, RouterModule} from '@angular/router';

//main components
import {LoginComponent} from '../components/login/login.component';
import {AdminComponent} from '../components/admin/admin.component';

//admin components
import {Home} from '../components/home/home.component';
import {Monitor} from '../components/monitor/monitor.component';
import {Gps} from '../components/gps/gps.component';
import {Settings} from '../components/settings/settings.component';


//admin home components
import {HomeAlerts} from '../components/home/alerts/home.alerts.component';
import {HomeProcssedAlerts} from '../components/home/alerts_processed/home.alerts.processed.component';

//admin gps components
import {ShipmentMap} from '../components/gps/map/shipment-map.component';
import {ProcessedShipment} from '../components/gps/processed/processed-shipment.component';
import {Shipment} from '../components/gps/shipment/shiment.component';

//admin monitor components
import {Gas} from '../components/monitor/gas/gas.component';
import {Camera} from '../components/monitor/camera/camera.component';

//admin settings components

import {SettingsSms} from '../components/settings/sms/settings-sms.component';
import {SettingsAuth} from '../components/settings/auth/settings-auth.component';
import {SettingsAccess} from '../components/settings/access/settings-access.component';
import {SettingsAddress} from '../components/settings/address/settings-address.component';
import {SettingsFormula} from '../components/settings/formula/settings-formula.component';
import {SettingsOfflineUsers} from '../components/settings/offline_users/settings-offline-users.component';


const ROUTES: Routes = [

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
  {path: '', component: LoginComponent},
  {path:'admin',component:AdminComponent, children:[
    {path:'home', component:Home,children:[
      {path:'alerts', component:HomeAlerts},
      {path:'processed', component:HomeProcssedAlerts},
      {path:'**',component:HomeAlerts}
    ]},
    {path:'monitor', component:Monitor,children:[
      {path:'gas', component:Gas},
      {path:'camera', component:Camera},
      {path:'**',component:Gas}
    ]},
    {path:'gps', component:Gps,children:[
      {path:'shipment', component:Shipment},
      {path:'map/:tank', component:ShipmentMap},
      {path:'processed', component:ProcessedShipment},
      {path:'**',component:Shipment}
    ]},
    {path:'settings', component:Settings,children:[
      {path:'auth', component:SettingsAuth},
      {path:'sms', component:SettingsSms},
      {path:'access', component:SettingsAccess},
      {path:'address', component:SettingsAddress},
      {path:'offline-users', component:SettingsOfflineUsers},
      {path:'formula', component:SettingsFormula},
      {path:'**',component:SettingsAuth}

    ]},
    {path:'**',component:Home}
  ]},
  {path: '**', component: LoginComponent}
];

// export const globalRouterProviders: any[]  = [
//   //provideRouter(ROUTES)
// ];
export const globalRouting = RouterModule.forRoot(ROUTES);
