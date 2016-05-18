
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
import {SettingsService} from '../../../../services/settings.service';
import {RequestService} from '../../../../services/request.service';
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

      switch(data.tanks.type.value){
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
    editMode:boolean = false;
    editTarget:any;
    newTank:any = {
      code:'',
      addr:'',
      plcaddr1:'',
      plcaddr2:''
    };

    get users(){return this.data;}


    constructor(private settingsSrvc:SettingsService, private request:RequestService){
      console.log("add  address modal is up and running---");
      this.initUi();
    }


    addNewTank(){

      console.log("posting ----",this.newTank);

        this.request.post('/plc/tank',this.newTank).subscribe(res => {
            console.log("sub comp tank added-----", res);
            if(res.pl && res.pl.tank){
                this.settingsSrvc.addTank(res.pl.tank);
                jQuery("#"+this.data.id).closeModal();
            }
        });
    }

    updateTank(){
      console.log("posting ----",this.editTarget);
      this.request.put('/plc/tank',this.editTarget).subscribe(res => {
          console.log("sub comp tank updated-----", res);
          if(res.pl && res.pl.tank){
              this.settingsSrvc.updateTank(res.pl.tank);
             jQuery("#"+this.data.id).closeModal();
          }
      });
    }

    veSelectedTank(event, compRef){ //@todo running multiple times
      if(event && event.target && event.target.value){
        if(!compRef.editTarget){
              compRef.newTank.code = event.target.value;
        }
        else{
              compRef.editTarget.code = event.target.value;
        }
        compRef.initSelect();
      }

      console.log("tank selected----")

    }

    veSelecedPlcAddr1(event, compRef){
      if(event && event.target && event.target.value){
        if(!compRef.editTarget){
              compRef.newTank.plcaddr1 = event.target.value;
        }
        else{
              compRef.editTarget.plcaddr1 = event.target.value;
        }
      }
      compRef.initSelect();
    }

    veSelecedPlcAddr2(event, compRef){
      if(event && event.target && event.target.value){
        if(!compRef.editTarget){
              compRef.newTank.plcaddr2 = event.target.value;
        }
        else{
              compRef.editTarget.plcaddr2 = event.target.value;
        }
        compRef.initSelect();
      }
    }


    initUi(){
      var _this = this;
      setTimeout(_=>{
            _this.initSelect();
           jQuery('select#tankCode').on('change',function(event){
             _this.veSelectedTank(event, _this);
           });

           jQuery('select#plcAddr1').on('change',function(event){
             _this.veSelecedPlcAddr1(event, _this);
           });

           jQuery('select#plcAddr2').on('change',function(event){
             _this.veSelecedPlcAddr2(event, _this);
           });

      });
    }

    initSelect(){
       jQuery('select').material_select();
    }
 }
