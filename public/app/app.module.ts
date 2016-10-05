import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {globalRouting} from "./services/router.service";
import {MainComponent} from './components/main.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import { FormsModule }   from '@angular/forms';
import {UserService} from './services/user.service';
import {RequestService} from './services/request.service';
import {SettingsService} from './services/settings.service';
import {LibService} from './services/lib.service';
import {RTMessagesService} from './services/rt-messages.service';

//layout
import {Header} from './layout_components/header/header';
import {Navigator} from './layout_components/navigator/navigator';
import {Footer} from './layout_components/footer/footer';


//admin
import {Home} from './components/home/home.component';
import {Monitor} from './components/monitor/monitor.component';
import {Gps} from './components/gps/gps.component';
import {Settings} from './components/settings/settings.component';

//admin home
import {HomeAlerts} from './components/home/alerts/home.alerts.component';
import {HomeProcssedAlerts} from './components/home/alerts_processed/home.alerts.processed.component';

// admin gps
import {ShipmentMap} from './components/gps/map/shipment-map.component';
import {ProcessedShipment} from './components/gps/processed/processed-shipment.component';
import {Shipment} from './components/gps/shipment/shiment.component';

//admin monitor
import {Gas} from './components/monitor/gas/gas.component';
import {Camera} from './components/monitor/camera/camera.component';

//admin settings
import {SettingsSms} from './components/settings/sms/settings-sms.component';
import {SettingsAuth} from './components/settings/auth/settings-auth.component';
import {SettingsAccess} from './components/settings/access/settings-access.component';
import {SettingsAddress} from './components/settings/address/settings-address.component';
import {SettingsFormula} from './components/settings/formula/settings-formula.component';
import {SettingsOfflineUsers} from './components/settings/offline_users/settings-offline-users.component';



@NgModule({
  imports:  [
    BrowserModule,
    FormsModule,
    HttpModule,
    globalRouting
  ],
  declarations: [
    MainComponent,
    LoginComponent,
    AdminComponent,
    Header,
    Navigator,
    Footer,
    Home,
    Monitor,
    Gps,
    Settings,
    HomeAlerts,
    HomeProcssedAlerts,

    ShipmentMap,
    ProcessedShipment,
    Shipment,

    Gas,
    Camera,

    SettingsSms,
    SettingsAuth,
    SettingsAccess,
    SettingsAddress,
    SettingsFormula,
    SettingsOfflineUsers

  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserService,
    RequestService,
    SettingsService,
    RTMessagesService,
    LibService
  ],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
