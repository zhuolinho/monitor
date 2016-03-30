import {Component} from 'angular2/core';
import {config} from '../../config';

@Component({
    selector: 'action',
    templateUrl: config.prefix +  'layout_components/action/action.html'
})

export class Action {
    constructor() {
        // console.log('action loaded...')
    }
}
