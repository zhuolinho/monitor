
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {GasDetail} from './details/gas.detail.component';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html',
  directives:[GasDetail]
})

export class Gas{

    availableTanks:any[] = [
        {id:'12345', selected:false},
        {id:'62545', selected:false},
        {id:'27456', selected:false},
        {id:'72145', selected:false},
        {id:'19345', selected:false},
        {id:'82345', selected:false},
        {id:'32345', selected:false},
        {id:'11345', selected:false},
        {id:'22345', selected:false},
        {id:'82322', selected:false},
        {id:'22325', selected:false},
        {id:'99345', selected:false},
        {id:'902345', selected:false},
        {id:'102345', selected:false},
        {id:'444235', selected:false},
        {id:'602345', selected:false},
        {id:'62340', selected:false},
        {id:'72305', selected:false},
        {id:'50345', selected:false},
        {id:'56665', selected:false}
    ]

    allTankSelected:boolean = false;
    selectedTanks:any[] = [];
    constructor(){
      console.log("gas is up and running");
      this.initSelect();
      this.initModal();
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }

    veReturnSelectedTanks(){
      if(this.selectedTanks.length){
           console.log("selectedTanks--",this.selectedTanks.length,this.selectedTanks);
      }
    }

    veAddSelectedTanks(){
      if(this.selectedTanks.length){
           console.log("selectedTanks--",this.selectedTanks.length,this.selectedTanks);
      }
    }
   veToggleSelectAllTanks(){
      this.selectedTanks = [];
     if(!this.allTankSelected){
       for (let i = 0; i < this.availableTanks.length; i++) {
            this.availableTanks[i].selected = true;
            this.selectedTanks.push(this.availableTanks[i]);
        }
     }
     else{
       for (let i = 0; i < this.availableTanks.length; i++) {
            this.availableTanks[i].selected = null;
        }
     }

     console.log("this.selectedTanks ----",this.selectedTanks.length, this.selectedTanks );
     this.allTankSelected = !this.allTankSelected;

   }



   veSelectTank(tank){
     tank.selected = !tank.selected;
     if(tank.selected){
          this.selectedTanks.push(tank);
     }
     else{
       var array =  _.remove(this.selectedTanks, function(o){
          return o.id == tank.id;
        })
     }

      console.log("selectedTanks--",this.selectedTanks.length,this.selectedTanks,tank,array);

   }
    initModal(){

      var _this = this;

        setTimeout(_=>{
            jQuery('.modal-trigger').leanModal({
                 dismissible: true, // Modal can be dismissed by clicking outside of the modal
                 opacity: .5, // Opacity of modal background
                 in_duration: 300, // Transition in duration
                 out_duration: 200, // Transition out duration
                 ready: function() { console.log('Ready');  _this.initSelect()}, // Callback for Modal open
                 complete: function() { console.log('Closed'); } // Callback for Modal close
           });
          //  alert('getting models up');
        });
    }
 }
