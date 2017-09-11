import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class UtilsService {

  constructor() { }

  private homeAlertSortSource = new Subject<any>();

  homeAlertSortAll$ = this.homeAlertSortSource.asObservable();


  homeAlertSortAll() {
    this.homeAlertSortSource.next();
  }
}
