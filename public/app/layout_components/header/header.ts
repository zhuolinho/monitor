import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common'
import {config} from '../../config'
import {RouterLink} from 'angular2/router'

declare var jQuery:any;

@Component({
    selector: 'header',
    templateUrl: config.prefix + 'layout_components/header/header.html',
    directives:[CORE_DIRECTIVES,RouterLink]
})

export class Header {
    search:string = 'Explore monitor';
    title:string = config.title;
    logo:string = config.logo;
    color:string = config.color;
    constructor() {
      // this.logo = CONFIG.resourcePath + 'img/logo.png'
      // console.log(this.logo);

        // console.log('app header loaded...')
        // Search class for focus
        jQuery('.header-search-input').focus(
        function(){
            jQuery(this).parent('div').addClass('header-search-wrapper-focus');
        }).blur(
        function(){
            jQuery(this).parent('div').removeClass('header-search-wrapper-focus');
        });
        // Search class for focus
        jQuery('.header-search-input').focus(
        function(){
            jQuery(this).parent('div').addClass('header-search-wrapper-focus');
        }).blur(
        function(){
            jQuery(this).parent('div').removeClass('header-search-wrapper-focus');
        });
    }
    change(val){
        console.log(val);
    }
    toggleFullScreen() {

        // if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        //     if (document.documentElement.requestFullScreen) {
        //         document.documentElement.requestFullScreen();
        //     }
        //     else if (document.documentElement.mozRequestFullScreen) {
        //         document.documentElement.mozRequestFullScreen();
        //     }
        //     else if (document.documentElement.webkitRequestFullScreen) {
        //         document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        //     }
        // }
        // else {
        //     if (document.cancelFullScreen) {
        //         document.cancelFullScreen();
        //     }
        //     else if (document.mozCancelFullScreen) {
        //         document.mozCancelFullScreen();
        //     }
        //     else if (document.webkitCancelFullScreen) {
        //         document.webkitCancelFullScreen();
        //     }
        // }
    }
}
// Fullscreen
// function toggleFullScreen() {

// }

// $('.toggle-fullscreen').click(function() {
//     toggleFullScreen();
// });
