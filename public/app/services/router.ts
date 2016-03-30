import {Injectable, Type,ViewEncapsulation} from 'angular2/core'
import {RouteRegistry,AsyncRoute} from 'angular2/router'
import  {Request} from './request';
import {MainComponent} from '../components/main.component';

declare var _:any;
declare var System:any;

@Injectable()
export class DynamicRouteConfigurator {
  constructor(private registry: RouteRegistry, private request:Request) {

  }

  addRoute(component: Type, route) {
    let routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this._updateRouteConfig(component, routeConfig);
    this.registry.config(component, route);
  }
  removeRoute() {
    // need to touch private APIs - bad
  }
  getRoutes(component: Type) {
      return Reflect.getMetadata('annotations', component)
          .filter(a => {
            return a.configs!=undefined;
          }).pop();
  }
  _updateRouteConfig(component: Type, routeConfig) {
    let annotations = Reflect.getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
        if (annotations[i].configs!=undefined) {
            routeConfigIndex = i;
            break;
          }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, MainComponent);
  }

  dynamicLoader(routes:any[],target){
    var _this = this;
    // Object.keys(routes).forEach(function(key, value){
    //   // console.log(key)
    //   // console.log(routes[key]);
    //   _this._setRoutes(routes[key],target)
    // })
    // var navigationHeaders = Object.keys(routes);
    // for (let i = 0; i < navigationHeaders.length; i++) {
    //   var key = navigationHeaders[i]
    //   // console.log(key);
    //   for (let n = 0; n < routes[key].length; n++) {
    //       // console.log(routes[key][n]);
    //       this._setRoutes(routes[key][n],target)
    //   }
    // }


    // console.log(routes);
    //   console.log(Object.keys(routes));


    for (let i = 0; i < routes.length; i++) {
      if (routes[i].type == 'route') {
        this._setRoutes(routes[i],target)
      }

    }
  }

   _setRoutes(route,target){
    //  console.log('here')
    // console.log('route =======', route);
      var _this = this;

       this.addRoute(target.constructor,
                   new AsyncRoute({
                     path: route.path
                     ,loader:() =>   System.import(route.url).then(function(resp){ target.appRoutes = _this._getAppRoutes(target); return resp[route.component]; })
                     ,name:route.name
        }));
    }
      _getAppRoutes(target): any[] {
          return this.getRoutes(target.constructor).configs.map(route => {
                return { link: [`/${route.name}`], title: route.name,icon:'mdi-action-dashboard' };

          });
      }
}
