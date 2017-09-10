import { Component } from '@angular/core';
import { config } from '../../../config';
import { RequestService } from '../../../services/request.service';
import { SettingsService } from '../../../services/settings.service';
declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'settings-address',
  templateUrl: config.prefix + '/components/settings/offline_users/settings-offline-users.component.html'
})


export class SettingsOfflineUsers {

  currentSort = 'all';
  selectedtab = 1;
  userCategory: string;
  staffArray: any[] = [];
  users: any[];
  editMode: boolean = false;
  editTarget: any;
  newUser: OfflineUser = new OfflineUser();

  constructor(private request: RequestService, private settingsSrvc: SettingsService) {
    console.log("Settings Offline users is up and running");
    var self = this;
    this.request.get("/users/offline.json").subscribe(res => {
      console.log("got response--", res);
      if (res.pl && res.pl.users) {
        this.users = res.pl.users;
      }

      console.log("got users--", this.users);


      var groupUsersObj = _.groupBy(this.users, 'ap');

      [6, 8].forEach(function(key) {
        if (config.usersPrivileges[key + '']) {
          var group = { type: { id: key, value: config.usersPrivileges[key + ''] }, data: groupUsersObj[key] || [] };
          self.staffArray.push(group);
        }

      });

      this.settingsSrvc.newUserAdded$.subscribe(newUser => {
        console.log("here is the new user----", newUser);
        var correspondingGroup = _.find(self.staffArray, function(o) {
          return o.type.id == newUser.ap;
        });

        if (correspondingGroup) {
          correspondingGroup.data.unshift(newUser);
          self.initModal();
        }
      });


      this.settingsSrvc.userUpdated$.subscribe(user => {
        console.log("here is the updated user----", user);
      });
      this.initUi();

      // console.log("key by", self.staffArray)
    });
  }

  veSortBy(which) {
    if (this.currentSort != which) {
      this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
      setTimeout(_ => {
        this.currentSort = which
        this.initUi();
      }, 100);
    }
  }


  showDetailModal(arg) {
    console.log("selected itme----", arg);
    var that = this;
    if (arg.user) {
      this.editMode = true;
      this.editTarget = _.assign({}, arg.user);
      this.userCategory = config.usersPrivileges[this.editTarget.ap];
    } else {
      this.editMode = false;
      this.editTarget = null;
      this.newUser = new OfflineUser();
      this.newUser.ap = arg.category;
      this.userCategory = config.usersPrivileges[this.newUser.ap];
    }
    jQuery("#settingsOfflineUsersDetailModal").openModal({
      ready: function() {
        that.initSelect();
      }
    });
  }

  closeDetailModal() {
    jQuery("#settingsOfflineUsersDetailModal").closeModal();
  }


  addNewUser() {
    console.log("posting ----", this.newUser);

    this.request.post('/users/signup.json', this.newUser).subscribe(res => {
      console.log("sub comp offline user added-----", res);
      if (res.pl && res.pl.user) {
        this.settingsSrvc.addUser(res.pl.user);
        this.closeDetailModal();
      }
    });
  }

  updateUser() {
    console.log("posting ----", this.editTarget);
    this.request.put('/users/update.json', this.editTarget).subscribe(res => {
      console.log("user added-----", res);
      if (res.pl && res.pl.user) {
        var groupIndex = _.findIndex(this.staffArray, (addrGrp) => {
          return addrGrp.type.value == this.userCategory
        });

        var index = _.findIndex(this.staffArray[groupIndex].data, (o) => {
          return o._id == res.pl.user._id;
        });

        if (index > -1) {
          this.staffArray[groupIndex].data.splice(index, 1, res.pl.user);
        }
        this.settingsSrvc.updateUser(res.pl.user);
        this.closeDetailModal();
      }

    });
  }


  initUi() {
    this.initCollapase();
    this.initModal();

  }
  initCollapase() {
    setTimeout(_ => {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });
  }

  initModal() {
    var that = this;
    setTimeout(_ => {
      jQuery('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() { console.log('Ready'); that.initSelect() }, // Callback for Modal open
        complete: function() { console.log('Closed'); } // Callback for Modal close
      });
    });
  }

  initSelect() {
    setTimeout(_ => {
      jQuery('select').material_select();
    });
  }
}


class OfflineUser {
  name = "";
  phone = "";
  email = '';
  pw = "111111";
  addr = "";
  ap = "";
  sex = ""
};
