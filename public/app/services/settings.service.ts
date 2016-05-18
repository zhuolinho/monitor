import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SettingsService{

  constructor(){}

  private newUserSource = new Subject<any>();
  private updatedUserSource = new Subject<any>();

  newUserAdded$ = this.newUserSource.asObservable();
  userUpdated$ = this.updatedUserSource.asObservable();


  addUser(user:any){
    this.newUserSource.next(user);
  }

  updateUser(user:any){
    this.updatedUserSource.next(user);
  }

}
