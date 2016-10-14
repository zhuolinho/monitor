import {Component} from '@angular/core';
// import {utilService} from "../../commons/services/utilService";
import {config} from '../../config';

@Component({
    selector: 'footer',
    templateUrl:  config.prefix + 'layout_components/footer/footer.html'
})

//
// @View({
//
//     //styleUrls: [],
//     //directives:[CORE_DIRECTIVES,RouterLink]
// })
export class Footer {
    constructor() {

        // console.log('app footer loaded...')
    }
}
