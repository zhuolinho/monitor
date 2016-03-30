System.register(['angular2/core', 'angular2/router', './request', '../components/main.component'], function(exports_1, context_1) {
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
    var core_1, router_1, request_1, main_component_1;
    var DynamicRouteConfigurator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            }],
        execute: function() {
            DynamicRouteConfigurator = (function () {
                function DynamicRouteConfigurator(registry, request) {
                    this.registry = registry;
                    this.request = request;
                }
                DynamicRouteConfigurator.prototype.addRoute = function (component, route) {
                    var routeConfig = this.getRoutes(component);
                    routeConfig.configs.push(route);
                    this._updateRouteConfig(component, routeConfig);
                    this.registry.config(component, route);
                };
                DynamicRouteConfigurator.prototype.removeRoute = function () {
                    // need to touch private APIs - bad
                };
                DynamicRouteConfigurator.prototype.getRoutes = function (component) {
                    return Reflect.getMetadata('annotations', component)
                        .filter(function (a) {
                        return a.configs != undefined;
                    }).pop();
                };
                DynamicRouteConfigurator.prototype._updateRouteConfig = function (component, routeConfig) {
                    var annotations = Reflect.getMetadata('annotations', component);
                    var routeConfigIndex = -1;
                    for (var i = 0; i < annotations.length; i += 1) {
                        if (annotations[i].configs != undefined) {
                            routeConfigIndex = i;
                            break;
                        }
                    }
                    if (routeConfigIndex < 0) {
                        throw new Error('No route metadata attached to the component');
                    }
                    annotations[routeConfigIndex] = routeConfig;
                    Reflect.defineMetadata('annotations', annotations, main_component_1.MainComponent);
                };
                DynamicRouteConfigurator.prototype.dynamicLoader = function (routes, target) {
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
                    for (var i = 0; i < routes.length; i++) {
                        if (routes[i].type == 'route') {
                            this._setRoutes(routes[i], target);
                        }
                    }
                };
                DynamicRouteConfigurator.prototype._setRoutes = function (route, target) {
                    //  console.log('here')
                    // console.log('route =======', route);
                    var _this = this;
                    this.addRoute(target.constructor, new router_1.AsyncRoute({
                        path: route.path,
                        loader: function () { return System.import(route.url).then(function (resp) { target.appRoutes = _this._getAppRoutes(target); return resp[route.component]; }); },
                        name: route.name
                    }));
                };
                DynamicRouteConfigurator.prototype._getAppRoutes = function (target) {
                    return this.getRoutes(target.constructor).configs.map(function (route) {
                        return { link: [("/" + route.name)], title: route.name, icon: 'mdi-action-dashboard' };
                    });
                };
                DynamicRouteConfigurator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.RouteRegistry, request_1.Request])
                ], DynamicRouteConfigurator);
                return DynamicRouteConfigurator;
            }());
            exports_1("DynamicRouteConfigurator", DynamicRouteConfigurator);
        }
    }
});
