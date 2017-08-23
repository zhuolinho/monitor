
import { Component } from '@angular/core';
import { config } from '../../config';
import { UserService } from '../../services/user.service';
import { Router, CanActivate } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'login',
  templateUrl: config.prefix + '/components/login/login.component.html',
  styleUrls: [config.prefix + '/components/login/resources/css/style.css']
})

export class LoginComponent {

  user: any = { username: '', password: '' };
  router: Router;
  loginError: boolean = false;
  constructor(public localUserService: UserService, router: Router) {
    this.router = router;
    console.log("login is up and running");
  }

  login() {
    console.log("this.user.password---", this.user);
    this.loginError = false;
    this.localUserService.login({ username: this.user.username, password: this.user.password }).subscribe(res => {

      if (!res.er) {
        this.localUserService.saveUser(res.pl);

        var patern = /^[GCL]\d{3}$/;
        if (res.pl && res.pl.user && patern.test(res.pl.user.name)) {
          this.router.navigate(['/view/tank-stats', res.pl.user.name]);
        } else {
          this.router.navigate(['/admin/home/alerts']);
        }
      } else {
        this.loginError = true;
      }
    });
  }
}
