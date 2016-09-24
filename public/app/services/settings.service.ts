import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SettingsService{

  constructor(){}

  private newUserSource = new Subject<any>();
  private updatedUserSource = new Subject<any>();

  private newAddressSource = new Subject<any>();
  private updatedAddressSource = new Subject<any>();

  newUserAdded$ = this.newUserSource.asObservable();
  userUpdated$ = this.updatedUserSource.asObservable();
  newAddressAdded$ = this.newAddressSource.asObservable();
  addressUpdated$ = this.updatedAddressSource.asObservable();


  addUser(user:any){
    this.newUserSource.next(user);
  }

  updateUser(user:any){
    this.updatedUserSource.next(user);
  }

  addAddress(address:any){
    this.newAddressSource.next(address);
  }

  updateAddress(address:any){
    this.updatedAddressSource.next(address);
  }

}
