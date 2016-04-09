import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, RequestOptions,Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Request {
  private http: Http;
  private paramHeaders: any = new Headers({ 'Content-Type': 'application/json' });
  private paramOptions:any;

  public constructor(httpService: Http) {
    this.http = httpService;
    this.paramOptions = new RequestOptions({ headers: this.paramHeaders});
  }

  get(path) {
    console.log('path',path);
    return this.http.get(path, this.paramOptions).map((response: Response) => {
      return response.json();
    });
  }

  post(path, data) {

    return this.http.post(path,  JSON.stringify(data), this.paramOptions).map((response: Response) => {
        var r: any = response.json();
        return r;
    });
  }
}
