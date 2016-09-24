import {Component} from '@angular/core';
import {config} from '../../config';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

declare var jQuery:any;

@Component({
    selector: 'header',
    templateUrl: config.prefix + 'layout_components/header/header.html',
    styleUrls:[config.prefix +'layout_components/header/resources/css/style.css']
})

export class Header {
    search:string = 'Explore monitor';
    title:string = config.title;
    logo:string = config.logo;
    color:string = config.color;
    router:Router;
    user:any;
    constructor(router:Router, private localUserService:UserService) {
      this.router = router;
      this.user = this.localUserService.getUser();

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
        this.localUserService.logout();
        this.router.navigate(['/']);
    }

}
