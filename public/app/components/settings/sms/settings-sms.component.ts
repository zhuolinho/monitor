import { Component } from '@angular/core';
import { config } from '../../../config';
import { RequestService } from '../../../services/request.service';
// import {SettingsAddSmsUser} from './partials/settings-add-sms-user.component';
declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'settings-sms',
  templateUrl: config.prefix + '/components/settings/sms/settings-sms.component.html',
  // directives:[SettingsAddSmsUser]
})

export class SettingsSms {

  // userTestArray:any[] = [
  //           {
  //             type:{id:1,value:'报警短信'},
  //             data:[
  //               {
  //                 an:'101',  //account number
  //                 name: '胡某某',
  //                 addr:'----',
  //                 phone:'13987226225',
  //                 ap:'1******6',  // account password
  //                 p:'1' //permission
  //               },
  //               {
  //                 an:'102',  //account number
  //                 name: '徐某某',
  //                 addr:'----',
  //                 phone:'18987226225',
  //                 ap:'1******6',  // account password
  //                 p:'1' //permission
  //               },
  //               {
  //                 an:'103',  //account number
  //                 name: '高阳',
  //                 addr:'----',
  //                 phone:'17987226228',
  //                 ap:'1******6',  // account password
  //                 p:'1' //permission
  //               },
  //               {
  //                 an:'104',  //account number
  //                 name: '高琳',
  //                 addr:'----',
  //                 phone:'13987226228',
  //                 ap:'1******6',  // account password
  //                 p:'1' //permission
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:2,value:'接警短信'},
  //             data:[
  //               {
  //                 an:'201',  //account number
  //                 name: '韩丽',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'202',  //account number
  //                 name: '宋红',
  //                 addr:'----',
  //                 phone:'14987226225',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'203',  //account number
  //                 name: '高阳',
  //                 addr:'----',
  //                 phone:'17987226228',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               },
  //               {
  //                 an:'204',  //account number
  //                 name: '梁凯',
  //                 addr:'----',
  //                 phone:'1392226228',
  //                 ap:'1******6',  // account password
  //                 p:'2' //permission
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:3,value:'配送短信'},
  //             data:[
  //               {
  //                 an:'301',  //account number
  //                 name: '赵敏',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'3' //permission
  //               },
  //               {
  //                 an:'302',  //account number
  //                 name: '孔德',
  //                 addr:'----',
  //                 phone:'13987226225',
  //                 ap:'1******6',  // account password
  //                 p:'3' //permission
  //               }
  //             ]
  //           },
  //           {
  //             type:{id:4,value:'到达短信'},
  //             data:[
  //               {
  //                 an:'401',  //account number
  //                 name: 'Candy',
  //                 addr:'----',
  //                 phone:'13987226223',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               },
  //               {
  //                 an:'401',  //account number
  //                 name: '周璐',
  //                 addr:'----',
  //                 phone:'18987226003',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               },
  //               {
  //                 an:'401',  //account number
  //                 name: '黄金红',
  //                 addr:'----',
  //                 phone:'13937722609',
  //                 ap:'1******6',  // account password
  //                 p:'4' //permission
  //               }
  //             ]
  //           }
  //
  // ];

  currentSort: string = 'all';
  selectedtab: number = 0;
  editMode: boolean = false;
  userGroupsArray: any[] = [];
  editTarget: any;
  smsType: string;
  users: any[] = [];
  userArray: any[] = [];
  constructor(private request: RequestService) {
    console.log("SettingsSms is up and running");

    this.request.get("/users/access.json").subscribe(res => {
      console.log("got response for users--", res);
      if (res.pl && res.pl.users) {
        this.users = res.pl.users;
        this.sortUsers();

      }
      this.initUi();

    });
  }

  smsUserSelected(event) {
    this.editTarget = _.find(this.users, { an: parseInt(event.target.value) });
    console.log('this.currentPlcTank---', event.target.value, this.editTarget);
  }

  initSelect() {

    var that = this;
    setTimeout(_ => {
      jQuery('select:not(simple-select)').material_select();

      jQuery('select.sms-users-select').change(function(e) {
        console.log('changed');
        that.smsUserSelected(e);
      });
    });
  }

  sortUsers() {
    var alerts = [];
    var processedAlerts = [];
    var shipments = [];
    var completeShipments = [];

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].anc.a || this.users[i].anc.iaa || this.users[i].anc.iaa || this.users[i].anc.la || this.users[i].anc.sia) {
        alerts.push(this.users[i]);
      }

      if (this.users[i].anc.ap || this.users[i].anc.iaap || this.users[i].anc.iaap || this.users[i].anc.lap || this.users[i].anc.siap) {
        processedAlerts.push(this.users[i]);
      }

      if (this.users[i].anc.sa) {
        shipments.push(this.users[i]);
      }


      if (this.users[i].anc.sca) {
        completeShipments.push(this.users[i]);
      }

      this.userArray[0] = { type: { id: 1, value: '报警短信' }, data: alerts };
      this.userArray[1] = { type: { id: 2, value: '接警短信' }, data: alerts };
      this.userArray[2] = { type: { id: 3, value: '配送短信' }, data: shipments };
      this.userArray[3] = { type: { id: 4, value: '送达短信' }, data: completeShipments };
    }
  }


  veSortBy(wich) {
    if (this.currentSort != wich) {
      this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
      setTimeout(_ => {
        this.currentSort = wich;
        this.initUi();
      }, 100);
    }
  }



  showDetailModal(arg) {
    var that = this;

    if (arg.user) {
      this.editMode = true;
      this.editTarget = arg.user;
    }
    else {
      this.editMode = false;
      this.editTarget = null;
    }

    this.smsType = arg.type;

    jQuery("#settingsSmsDetailsModal").openModal({});
  }

  closeDetailModal() {
    jQuery("#settingsSmsDetailsModal").closeModal();
    this.sortUsers();
  }


  veToggleSelectPermission(p) {

    console.log("toggle item-----", p);

    if (this.editTarget && this.editTarget.anc) {
      this.editTarget.anc[p] = !this.editTarget.anc[p];
      if (p == 'a') {
        this.editTarget.anc['iaa'] = this.editTarget.anc[p];
        this.editTarget.anc['la'] = this.editTarget.anc[p];
        this.editTarget.anc['sia'] = this.editTarget.anc[p];
      }
      else if (p == 'ap') {
        this.editTarget.anc['iaap'] = this.editTarget.anc[p];
        this.editTarget.anc['lap'] = this.editTarget.anc[p];
        this.editTarget.anc['siap'] = this.editTarget.anc[p];
      }
    }
    else {
      alert('请选择用户!');
      return false;
    }

    console.log("editTarget----", this.editTarget);
  }


  updateUser() {
    console.log("posting ----", this.editTarget);
    if (this.editTarget) {
      this.request.put('/users/update.json', this.editTarget).subscribe(res => {
        console.log("user updated-----", res);
        if (res.pl && res.pl.user) {
          this.closeDetailModal();
        }
        this.sortUsers();

      });
    }
    else {
      alert('请选择用户');
    }

  }





  initUi() {

    var that = this;

    setTimeout(_ => {
      jQuery('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200 // Transition out duration
      });
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
      this.initSelect();
    });

  }




}
