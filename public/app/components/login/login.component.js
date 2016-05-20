System.register(['angular2/core', '../../config', '../../services/user.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, config_1, user_service_1, router_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(localUserService, router) {
                    this.localUserService = localUserService;
                    this.user = { username: '', password: '' };
                    this.router = router;
                    console.log("login is up and running");
                    this.validateForm();
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    console.log("this.user.password---", this.user);
                    this.localUserService.login({ username: this.user.username, password: this.user.password }).subscribe(function (res) {
                        if (!res.er) {
                            _this.localUserService.saveUser(res.pl);
                            _this.router.navigate(['Admin']);
                        }
                    });
                };
                LoginComponent.prototype.validateForm = function () {
                    setTimeout(function (_) {
                        console.log("validating----");
                        jQuery("#loginForm").validate({
                            rules: {
                                username: "required",
                                password: {
                                    required: true,
                                    minlength: 6
                                }
                            },
                            //For custom messages
                            messages: {
                                username: "safort",
                                password: {
                                    required: "safort",
                                    minlength: "too short"
                                }
                            },
                            errorElement: 'div',
                            errorPlacement: function (error, element) {
                                console.log("error, element----", error, element);
                                var placement = jQuery(element).data('error');
                                if (placement) {
                                    jQuery(placement).append(error);
                                }
                                else {
                                    error.insertAfter(element);
                                }
                            }
                        });
                        //  jQuery.validator.setDefaults({
                        //         ignore: []
                        //   });
                    }, 1000);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: config_1.config.prefix + '/components/login/login.component.html',
                        styleUrls: [config_1.config.prefix + '/components/login/resources/css/style.css']
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
