import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {config} from '../../config';
import {RouterLink} from 'angular2/router';
import {Router} from 'angular2/router';

declare var jQuery:any;

@Component({
    selector: 'header',
    templateUrl: config.prefix + 'layout_components/header/header.html',
    directives:[CORE_DIRECTIVES,RouterLink],
    styleUrls:[config.prefix +'layout_components/header/resources/css/style.css']
})

export class Header {
    search:string = 'Explore monitor';
    title:string = config.title;
    logo:string = config.logo;
    color:string = config.color;
    router:Router;
    constructor(router:Router) {
      this.router = router;
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

    logout(){
        this.router.navigate(['/Login']);
    }

}
