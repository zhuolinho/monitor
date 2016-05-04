
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {GasDetail} from './details/gas.detail.component';
declare var jQuery:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html',
  directives:[GasDetail]
})

export class Gas{

    availableTanks:any[] = [
        {id:'12345', selected:true},
        {id:'62545', selected:true},
        {id:'27456', selected:false},
        {id:'72145', selected:false},
        {id:'19345', selected:true},
        {id:'82345', selected:false},
        {id:'32345', selected:true},
        {id:'11345', selected:false},
        {id:'22345', selected:false},
        {id:'82322', selected:true},
        {id:'22325', selected:true},
        {id:'99345', selected:true},
        {id:'902345', selected:false},
        {id:'102345', selected:true},
        {id:'444235', selected:true},
        {id:'602345', selected:false},
        {id:'62340', selected:true},
        {id:'72305', selected:false},
        {id:'50345', selected:true},
        {id:'56665', selected:true}
    ]

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
      var selectedTanks = [];
      for (let i = 0; i < this.availableTanks.length; i++) {
        if(this.availableTanks[i].selected){
          selectedTanks.push(this.availableTanks[i]);
        }
       }
      //  console.log("selectedTanks--",selectedTanks.length,selectedTanks);
    }
   veSelectAllTanks(){
    for (let i = 0; i < this.availableTanks.length; i++) {
         this.availableTanks[i].selected = true;
     }

    //  console.log("all selected----",this.availableTanks.length,this.availableTanks);
   }

   veSelectTank(tank){
     tank.selected = !tank.selected;
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
