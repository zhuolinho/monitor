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
var config_1 = require("../../../config");
var request_service_1 = require("../../../services/request.service");
var settings_service_1 = require("../../../services/settings.service");
var SettingsAccess = (function () {
    function SettingsAccess(request, settingsSrvc) {
        var _this = this;
        this.request = request;
        this.settingsSrvc = settingsSrvc;
        this.userArray = [];
        this.currentSort = 'all';
        this.selectedtab = 0;
        this.newUser = {
            name: "",
            phone: "",
            email: '',
            pw: "",
            addr: "",
            ap: "",
            sex: ""
        };
        this.editMode = false;
        var self = this;
        console.log("SettingsAccess is up and running");
        this.request.get("/users/access.json").subscribe(function (res) {
            console.log("got response for users--", res);
            if (res.pl && res.pl.users) {
                _this.users = res.pl.users;
            }
            console.log("got users--", _this.users);
            var groupUsersObj = _.groupBy(_this.users, 'ap');
            [1, 2, 3, 4].forEach(function (key) {
                if (config_1.config.usersPrivileges[key + '']) {
                    var group = { type: { id: key, value: config_1.config.usersPrivileges[key + ''] }, data: groupUsersObj[key] || [] };
                    self.userArray.push(group);
                }
            });
            _this.settingsSrvc.newUserAdded$.subscribe(function (newUser) {
                console.log("here is the new user----", newUser);
                var correspondingGroup = _.find(self.userArray, function (o) {
                    return o.type.id == newUser.ap;
                });
                if (correspondingGroup) {
                    correspondingGroup.data.unshift(newUser);
                    self.initModal();
                }
            });
            _this.settingsSrvc.userUpdated$.subscribe(function (user) {
                console.log("here is the updated user----", user);
            });
            _this.initUi();
            // console.log("key by", self.userArray)
        });
    }
    SettingsAccess.prototype.veSortBy = function (wich) {
        var _this = this;
        if (this.currentSort != wich) {
            this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
            setTimeout(function (_) {
                _this.currentSort = wich;
                _this.initUi();
            }, 100);
        }
    };
    SettingsAccess.prototype.initUi = function () {
        this.initCollapase();
        this.initModal();
    };
    SettingsAccess.prototype.initCollapase = function () {
        setTimeout(function (_) {
            jQuery('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    };
    SettingsAccess.prototype.initModal = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery('.modal-trigger').leanModal({
                dismissible: true,
                opacity: .5,
                in_duration: 300,
                out_duration: 200,
                ready: function () { console.log('Ready'); that.initSelect(); },
                complete: function () { console.log('Closed'); } // Callback for Modal close
            });
        });
    };
    SettingsAccess.prototype.initSelect = function () {
        setTimeout(function (_) {
            jQuery('select').material_select();
        });
    };
    SettingsAccess.prototype.showDetailModal = function (arg) {
        console.log("selected itme----", arg);
        var that = this;
        if (arg.user) {
            this.editMode = true;
            this.editTarget = arg.user;
            this.userCategory = config_1.config.usersPrivileges[this.editTarget.ap];
        }
        else {
            this.editMode = false;
            this.editTarget = null;
            this.newUser.ap = arg.category;
            this.userCategory = config_1.config.usersPrivileges[this.newUser.ap];
        }
        jQuery("#settinsAccessDetailModal").openModal({
            ready: function () {
                that.initSelect();
            }
        });
    };
    SettingsAccess.prototype.closeDetailModal = function () {
        jQuery("#settinsAccessDetailModal").closeModal();
    };
    SettingsAccess.prototype.addNewUser = function () {
        var _this = this;
        console.log("posting ----", this.newUser);
        this.request.post('/users/signup.json', this.newUser).subscribe(function (res) {
            console.log("sub comp user added-----", res);
            if (res.pl && res.pl.user) {
                _this.settingsSrvc.addUser(res.pl.user);
                _this.closeDetailModal();
            }
        });
    };
    SettingsAccess.prototype.updateUser = function () {
        var _this = this;
        console.log("posting ----", this.editTarget);
        this.request.put('/users/update.json', this.editTarget).subscribe(function (res) {
            console.log("user added-----", res);
            if (res.pl && res.pl.user) {
                _this.settingsSrvc.updateUser(res.pl.user);
                _this.closeDetailModal();
            }
        });
    };
    SettingsAccess.prototype.veSelectGender = function (event) {
        console.log("value-----", event);
    };
    return SettingsAccess;
}());
SettingsAccess = __decorate([
    core_1.Component({
        selector: 'settings-access',
        templateUrl: config_1.config.prefix + '/components/settings/access/settings-access.component.html',
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService, settings_service_1.SettingsService])
], SettingsAccess);
exports.SettingsAccess = SettingsAccess;
