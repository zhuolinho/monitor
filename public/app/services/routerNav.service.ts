import { Injectable } from '@angular/core'
import { RequestService } from './request.service';
import 'rxjs/add/operator/map';

@Injectable()
export class routerNavService {
  currentModule: string;
}
