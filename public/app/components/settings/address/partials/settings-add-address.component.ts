
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-address',
  templateUrl:config.prefix + '/components/settings/address/partials/settings-add-address.component.html'
})

export class SettingsAddAddress{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;

      switch(data.addresses.type.value){
        case 'CNG':
                this.currentTanks = this.cngTanks;
                break;
        case 'LNG':
                this.currentTanks = this.lngTanks;
                break;
      case '集格':
              this.currentTanks = this.jigeTanks;
              break;
      case '杜瓦瓶':
              this.currentTanks = this.duwapingTanks;
              break;
      case '管网':
              this.currentTanks = this.guanwangTanks;
              break;

      case '中转站':
              this.currentTanks = this.zhongzhuanTanks;
              break;
        default:
              console.log('default');
      }
    }

    editMode:boolean = false;
    editTarget:any;

    lngTanks:any[] = [
      'L004','L005','L006','L007'
    ];
    cngTanks:any[] = [
      'C004','C005','C006','C007'
    ];
    jigeTanks:any[] = [
      'J004','J005','J006','J007'
    ];
    duwapingTanks:any[] = [
      'D004','D005','D006','D007'
    ];

    guanwangTanks:any[] = [
      'G004','G005','G006','G007'
    ];
    zhongzhuanTanks:any[] = [
      '中转站3号','中转站4号','中转站5号'
    ];

    currentTanks:any[] = [];

    get users(){return this.data;}


    constructor(){
      console.log("add  address modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }
