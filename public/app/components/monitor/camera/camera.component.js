System.register(["@angular/core", "../../../config"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, config_1, Camera;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            Camera = (function () {
                function Camera() {
                    this.selectedCam = config_1.config.camera[0].cameras[0].id;
                    this.currentCameras = config_1.config.camera[0].cameras;
                    this.allCameras = config_1.config.camera;
                    console.log("camera is up and running", this.allCameras, this.currentCameras, this.selectedCam);
                    this.initUi();
                }
                Camera.prototype.veCameraChanged = function (event) {
                    this.selectedCam = event.target.value;
                    console.log('this.selectedCam---', this.selectedCam);
                };
                Camera.prototype.veAddressChanged = function (event) {
                    console.log("event.target.value-----", event.target.value);
                    var temp = _.find(this.allCameras, { id: event.target.value });
                    this.currentCameras = temp.cameras;
                    this.selectedCam = this.currentCameras[0].id;
                    console.log('this.currentCameras---', this.currentCameras);
                    this.initUi();
                };
                Camera.prototype.initUi = function () {
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('select:not(simple-select)').material_select();
                        jQuery('select.select-camera').change(function (e) {
                            console.log('camera changed');
                            that.veCameraChanged(e);
                        });
                        jQuery('select.select-address').change(function (e) {
                            console.log('addres changed');
                            that.veAddressChanged(e);
                        });
                    });
                };
                return Camera;
            }());
            Camera = __decorate([
                core_1.Component({
                    selector: 'camera',
                    templateUrl: config_1.config.prefix + '/components/monitor/camera/camera.component.html'
                }),
                __metadata("design:paramtypes", [])
            ], Camera);
            exports_1("Camera", Camera);
        }
    };
});
