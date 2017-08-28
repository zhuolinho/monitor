import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private userServc: UserService) { }

  canActivate() {
    return this.userServc.getSettingAcess() ? true : false;
  }
}
