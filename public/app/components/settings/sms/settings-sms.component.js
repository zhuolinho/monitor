System.register(['@angular/core', '../../../config', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, config_1, request_service_1;
    var SettingsSms;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            }],
        execute: function() {
            SettingsSms = (function () {
                function SettingsSms(request) {
                    var _this = this;
                    this.request = request;
                    // userTestArray:any[] = [
                    //           {
                    //             type:{id:1,value:'报警短信'},
                    //             data:[
                    //               {
                    //                 an:'101',  //account number
                    //                 name: '胡某某',
                    //                 addr:'----',
                    //                 phone:'13987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'1' //permission
                    //               },
                    //               {
                    //                 an:'102',  //account number
                    //                 name: '徐某某',
                    //                 addr:'----',
                    //                 phone:'18987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'1' //permission
                    //               },
                    //               {
                    //                 an:'103',  //account number
                    //                 name: '高阳',
                    //                 addr:'----',
                    //                 phone:'17987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'1' //permission
                    //               },
                    //               {
                    //                 an:'104',  //account number
                    //                 name: '高琳',
                    //                 addr:'----',
                    //                 phone:'13987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'1' //permission
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:2,value:'接警短信'},
                    //             data:[
                    //               {
                    //                 an:'201',  //account number
                    //                 name: '韩丽',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'202',  //account number
                    //                 name: '宋红',
                    //                 addr:'----',
                    //                 phone:'14987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'203',  //account number
                    //                 name: '高阳',
                    //                 addr:'----',
                    //                 phone:'17987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'204',  //account number
                    //                 name: '梁凯',
                    //                 addr:'----',
                    //                 phone:'1392226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:3,value:'配送短信'},
                    //             data:[
                    //               {
                    //                 an:'301',  //account number
                    //                 name: '赵敏',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'3' //permission
                    //               },
                    //               {
                    //                 an:'302',  //account number
                    //                 name: '孔德',
                    //                 addr:'----',
                    //                 phone:'13987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'3' //permission
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:4,value:'到达短信'},
                    //             data:[
                    //               {
                    //                 an:'401',  //account number
                    //                 name: 'Candy',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               },
                    //               {
                    //                 an:'401',  //account number
                    //                 name: '周璐',
                    //                 addr:'----',
                    //                 phone:'18987226003',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               },
                    //               {
                    //                 an:'401',  //account number
                    //                 name: '黄金红',
                    //                 addr:'----',
                    //                 phone:'13937722609',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               }
                    //             ]
                    //           }
                    //
                    // ];
                    this.currentSort = 'all';
                    this.selectedtab = 0;
                    this.editMode = false;
                    this.userGroupsArray = [];
                    this.users = [];
                    this.userArray = [];
                    console.log("SettingsSms is up and running");
                    this.request.get("/users/access.json").subscribe(function (res) {
                        console.log("got response for users--", res);
                        if (res.pl && res.pl.users) {
                            _this.users = res.pl.users;
                            _this.sortUsers();
                        }
                        _this.initUi();
                    });
                }
                SettingsSms.prototype.smsUserSelected = function (event) {
                    this.editTarget = _.find(this.users, { an: parseInt(event.target.value) });
                    console.log('this.currentPlcTank---', event.target.value, this.editTarget);
                };
                SettingsSms.prototype.initSelect = function () {
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('select:not(simple-select)').material_select();
                        jQuery('select.sms-users-select').change(function (e) {
                            console.log('changed');
                            that.smsUserSelected(e);
                        });
                    });
                };
                SettingsSms.prototype.sortUsers = function () {
                    var alerts = [];
                    var processedAlerts = [];
                    var shipments = [];
                    var completeShipments = [];
                    for (var i = 0; i < this.users.length; i++) {
                        if (this.users[i].anc.a || this.users[i].anc.iaa || this.users[i].anc.iaa || this.users[i].anc.la || this.users[i].anc.sia) {
                            alerts.push(this.users[i]);
                        }
                        if (this.users[i].anc.ap || this.users[i].anc.iaap || this.users[i].anc.iaap || this.users[i].anc.lap || this.users[i].anc.siap) {
                            processedAlerts.push(this.users[i]);
                        }
                        if (this.users[i].anc.sa) {
                            shipments.push(this.users[i]);
                        }
                        if (this.users[i].anc.sca) {
                            completeShipments.push(this.users[i]);
                        }
                        this.userArray[0] = { type: { id: 1, value: '报警短信' }, data: alerts };
                        this.userArray[1] = { type: { id: 2, value: '接警短信' }, data: alerts };
                        this.userArray[2] = { type: { id: 3, value: '配送短信' }, data: shipments };
                        this.userArray[3] = { type: { id: 4, value: '送达短信' }, data: completeShipments };
                    }
                };
                SettingsSms.prototype.veSortBy = function (wich) {
                    var _this = this;
                    if (this.currentSort != wich) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = wich;
                            _this.initUi();
                        }, 100);
                    }
                };
                SettingsSms.prototype.showDetailModal = function (arg) {
                    var that = this;
                    if (arg.user) {
                        this.editMode = true;
                        this.editTarget = arg.user;
                    }
                    else {
                        this.editMode = false;
                        this.editTarget = null;
                    }
                    this.smsType = arg.type;
                    jQuery("#settingsSmsDetailsModal").openModal({});
                };
                SettingsSms.prototype.closeDetailModal = function () {
                    jQuery("#settingsSmsDetailsModal").closeModal();
                    this.sortUsers();
                };
                SettingsSms.prototype.veToggleSelectPermission = function (p) {
                    console.log("toggle item-----", p);
                    if (this.editTarget && this.editTarget.anc) {
                        this.editTarget.anc[p] = !this.editTarget.anc[p];
                        if (p == 'a') {
                            this.editTarget.anc['iaa'] = this.editTarget.anc[p];
                            this.editTarget.anc['la'] = this.editTarget.anc[p];
                            this.editTarget.anc['sia'] = this.editTarget.anc[p];
                        }
                        else if (p == 'ap') {
                            this.editTarget.anc['iaap'] = this.editTarget.anc[p];
                            this.editTarget.anc['lap'] = this.editTarget.anc[p];
                            this.editTarget.anc['siap'] = this.editTarget.anc[p];
                        }
                    }
                    else {
                        alert('请选择用户!');
                        return false;
                    }
                    console.log("editTarget----", this.editTarget);
                };
                SettingsSms.prototype.updateUser = function () {
                    var _this = this;
                    console.log("posting ----", this.editTarget);
                    if (this.editTarget) {
                        this.request.put('/users/update.json', this.editTarget).subscribe(function (res) {
                            console.log("user updated-----", res);
                            if (res.pl && res.pl.user) {
                                _this.closeDetailModal();
                            }
                            _this.sortUsers();
                        });
                    }
                    else {
                        alert('请选择用户');
                    }
                };
                SettingsSms.prototype.initUi = function () {
                    var _this = this;
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('.modal-trigger').leanModal({
                            dismissible: true,
                            opacity: .5,
                            in_duration: 300,
                            out_duration: 200 // Transition out duration
                        });
                        jQuery('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                        _this.initSelect();
                    });
                };
                SettingsSms = __decorate([
                    core_1.Component({
                        selector: 'settings-sms',
                        templateUrl: config_1.config.prefix + '/components/settings/sms/settings-sms.component.html',
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService])
                ], SettingsSms);
                return SettingsSms;
            }());
            exports_1("SettingsSms", SettingsSms);
        }
    }
});
