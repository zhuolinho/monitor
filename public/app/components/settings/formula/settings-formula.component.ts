import {Component} from '@angular/core';
import {config} from '../../../config';
import {CanActivate} from '@angular/router';
import {RequestService} from '../../../services/request.service';

declare var jQuery:any;
declare var _:any;

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
      allFormula:any[] = [];
      targetTanks:any[] = [];
      formulas:any[] = [];
      indexedFormula:any = {};
      indexedAddresses:any = {};

      constructor(private request:RequestService){
        console.log("SettingsFormula is up and running");

        this.request.get("/plc/address/all.json").subscribe(res => {
            console.log("got response--",res);
              if(res.pl && res.pl.address){
                var addresses = res.pl.address;
                this.indexedAddresses = _.keyBy(addresses,function(o){
                    return o.tank;
                })
            }
            console.log("this.indexedFormula ------",this.indexedAddresses );

          this.initUi();

        });


        this.request.get('/plc/formula/all.json').subscribe(resp => {
          console.log("got all formula-----",resp);
          if(resp&&resp.pl&&resp.pl.formula){
              this.allFormula = resp.pl.formula;
            console.log('got this.allFormula ',this.allFormula);
          }
        });


      }


      initUi(){

          var that = this;

            setTimeout(_=>{
                jQuery('.modal-trigger').leanModal({
                     dismissible: true, // Modal can be dismissed by clicking outside of the modal
                     opacity: .5, // Opacity of modal background
                     in_duration: 300, // Transition in duration
                     out_duration: 200, // Transition out duration
                     ready: function() { console.log('Ready');  that.initSelect()}, // Callback for Modal open
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
          jQuery("#settingsFormulaComputeDetailModal").openModal({
               ready: function() {
                    that.initSelect();
                }
          });
        }

        closeDetailModal(){
              jQuery("#settingsFormulaComputeDetailModal").closeModal();
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
