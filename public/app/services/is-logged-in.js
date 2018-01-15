"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_injector_1 = require("./app-injector");
var user_service_1 = require("./user.service");
var router_1 = require("@angular/router");
exports.isLoggedIn = function (to, from) {
    var injector = app_injector_1.appInjector();
    var userServc = injector.get(user_service_1.UserService);
    var router = injector.get(router_1.Router);
    if (userServc.getUser()) {
        return true;
    }
    else {
        router.navigate(['/Login']);
        return false;
    }
};
