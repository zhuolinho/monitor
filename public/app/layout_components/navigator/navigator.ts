import {Component, Input} from 'angular2/core';
import {RouterLink,ROUTER_DIRECTIVES} from 'angular2/router';
import {config} from '../../config'

@Component({
    selector: 'navigator',
    templateUrl: config.prefix +  'layout_components/navigator/navigator.html',
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class Navigator {
   navigations:any[];

    constructor() {
      this.navigations = [
        {link:'Home', title:'Dashboard', icon:'mdi-action-dashboard'},
        {link:'Gps', title:'Gps ', icon:'mdi-editor-insert-invitation'},
      ]
    }
}
