"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../config");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var Header = (function () {
    function Header(router, localUserService) {
        this.localUserService = localUserService;
        this.search = 'Explore monitor';
        this.title = config_1.config.title;
        this.logo = config_1.config.logo;
        this.color = config_1.config.color;
        this.router = router;
        this.user = this.localUserService.getUser();
        // this.logo = CONFIG.resourcePath + 'img/logo.png'
        // console.log(this.logo);
        // console.log('app header loaded...')
        // Search class for focus
        jQuery('.header-search-input').focus(function () {
            jQuery(this).parent('div').addClass('header-search-wrapper-focus');
        }).blur(function () {
            jQuery(this).parent('div').removeClass('header-search-wrapper-focus');
        });
        // Search class for focus
        jQuery('.header-search-input').focus(function () {
            jQuery(this).parent('div').addClass('header-search-wrapper-focus');
        }).blur(function () {
            jQuery(this).parent('div').removeClass('header-search-wrapper-focus');
        });
    }
    Header.prototype.change = function (val) {
        console.log(val);
    };
    Header.prototype.logout = function () {
        this.localUserService.logout();
        this.router.navigate(['/']);
    };
    return Header;
}());
Header = __decorate([
    core_1.Component({
        selector: 'header',
        templateUrl: config_1.config.prefix + 'layout_components/header/header.html',
        styleUrls: [config_1.config.prefix + 'layout_components/header/resources/css/style.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService])
], Header);
exports.Header = Header;
