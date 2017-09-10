import { Component } from '@angular/core';
import { config } from '../../../config';
import { RequestService } from '../../../services/request.service';
declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'settings-tanks',
  templateUrl: config.prefix + '/components/settings/tanks/tanks.component.html',
  // directives:[SettingsAddAddress]
})


export class SettingsTank {
  editMode: boolean = false;
  editTarget: any;
  tanks: any[] = [];
  newTank: any = new plcTank();

  constructor(private request: RequestService) {

    console.log("SettingsAddress is up and running");
    var self = this;

    this.request.get("/plc/tanks/all.json").subscribe(res => {
      console.log("got response--", res);
      if (res.pl && res.pl.tank) {
        this.tanks = res.pl.tank;
      }
      // console.log("key by", self.userArray)
    });
  }

  showDetailModal(arg) {
    console.log("selected item----", arg, this.tanks);
    var that = this;
    if (arg) {
      this.editMode = true;
      this.editTarget = _.assign({}, arg);

      jQuery('select#plcAddrTank').val(this.editTarget.tank);
      jQuery('select#plcAddrTank').attr('disabled', 'disabled');
    } else {
      this.editMode = false;
      this.editTarget = null;
      this.newTank = new plcTank();
    }


    jQuery("#settinsTanksDetailModal").openModal({
      ready: function() {
      }
    });
  }

  closeDetailModal() {
    jQuery("#settinsTanksDetailModal").closeModal();
  }


  initUi() {
    this.initModal();
  }

  initModal() {
    var that = this;
    setTimeout(_ => {
      jQuery('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() { console.log('Ready'); }, // Callback for Modal open
        complete: function() { console.log('Closed'); } // Callback for Modal close
      });
    });
  }


  addNew() {
    console.log("posting ----", this.newTank);
    if (this.newTank) {
      this.request.post('/plc/tanks/new.json', this.newTank).subscribe(res => {
        if (res.pl && res.pl.tank) {
          console.log('added new addr----', res.pl.tank);
          this.tanks.push(res.pl.tank);
          jQuery("#settinsTanksDetailModal").closeModal();
        }
        else {
          alert("系统错误!");
        }
      });
    }
    else {
      alert("请提供罐号");
    }

  }

  update() {
    console.log("posting ----", this.editTarget);
    this.request.put('/plc/tanks.json', this.editTarget).subscribe(res => {
      if (res && res.pl && res.pl.tank) {
        let index = _.findIndex(this.tanks, { _id: res.pl.tank._id });
        if (index > -1) {
          this.tanks.splice(index, 1, res.pl.tank);
        }
      } else {
        alert("系统错误!");
      }

      this.closeDetailModal();
    });
  }

}


export class plcTank {
  tank: string = '';
  addr: string = '';
};
