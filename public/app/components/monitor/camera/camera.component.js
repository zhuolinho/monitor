"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var Camera = (function () {
    function Camera() {
        this.selectedCam = config_1.config.camera[0].cameras[0].id;
        this.currentCameras = config_1.config.camera[0].cameras;
        this.allCameras = config_1.config.camera;
    }
    Camera.prototype.ngAfterViewInit = function () {
        this.initUi();
    };
    Camera.prototype.veCameraChanged = function (event, comp) {
        comp.selectedCam = event.target.value;
        console.log("veCameraChanged---", event, comp.selectedCam);
    };
    Camera.prototype.veAddressChanged = function (event, comp) {
        var temp = _.find(comp.allCameras, { id: event.target.value });
        comp.currentCameras = temp.cameras;
        comp.selectedCam = comp.currentCameras[0].id;
        // jQuery('select:not(simple-select)').material_select();
        this.initUi();
        console.log("veAddressChanged---", event, temp);
    };
    Camera.prototype.initUi = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery('select:not(simple-select)').material_select();
            jQuery('select.select-camera').change(function (e) {
                console.log('camera changed');
                that.veCameraChanged(e, that);
            });
            jQuery('select.select-address').change(function (e) {
                console.log('addres changed');
                that.veAddressChanged(e, that);
            });
        });
    };
    return Camera;
}());
Camera = __decorate([
    core_1.Component({
        selector: 'camera',
        templateUrl: config_1.config.prefix + '/components/monitor/camera/camera.component.html'
    })
], Camera);
exports.Camera = Camera;
