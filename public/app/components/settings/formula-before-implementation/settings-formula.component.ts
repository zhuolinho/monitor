import {Component} from '@angular/core';
import {config} from '../../../config';
import {CanActivate} from '@angular/router';

declare var jQuery:any;

@Component({
  selector:'settings-formula',
  templateUrl:config.prefix + '/components/settings/formula/settings-formula.component.html'
})

export class SettingsFormula{

      selectedtab:number = 1;
      newFormula:any = new plcFormula();

      tankType:string;

      editMode:boolean = false;
      editTarget:any;
      allTanks:any[] = [];
      targetTanks:any[] = [];

      constructor(){
        console.log("SettingsFormula is up and running");
        this.initUi();

      }

      veCalculateParameter(){
          this.initUi();
      }

      veElertParameter(){
            this.initUi();
      }

      initUi(){

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
            });
        }

        initSelect(){
          setTimeout(_=>{
               jQuery('select').material_select();
          });
        }



        showDetailModal(arg){
          console.log("selected item----",arg);
          var that = this;
          jQuery("#"+arg.modalId).openModal({
               ready: function() {
                    that.initSelect();
                }
          });
        }

        closeDetailModal(){
              // jQuery("#").closeModal();
        }

 }





 export class plcFormula  {

   code:string;
   divisor:number;
   factor:number;
   tt:number;
   pt:number;
   tank:string;
   tankType:string

   constructor(){

       this.code='';
       this.divisor=null;
       this.factor=null;
       this.tt=null;
       this.pt=null;
       this.tankType = '';
       this.tank='';
   }
 };
