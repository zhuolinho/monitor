import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions,Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
  private http: Http;
  private paramHeaders: any = new Headers({ 'Content-Type': 'application/json' });
  private paramOptions:any;

  public constructor(httpService: Http) {
    this.http = httpService;
    this.paramOptions = new RequestOptions({ headers: this.paramHeaders});
  }

  get(path) {
    return this.http.get(path, this.paramOptions).map((response: Response) => {
      return response.json();
    });
  }

  post(path, data) {
    // console.log(' this.paramOptions', this.paramOptions);
    return this.http.post(path,  JSON.stringify(data), this.paramOptions).map((response: Response) => {
        var r: any = response.json();
        return r;
    });
  }

  put(path, data) {
    // console.log(' this.paramOptions', this.paramOptions);
    return this.http.put(path,  JSON.stringify(data), this.paramOptions).map((response: Response) => {
        var r: any = response.json();
        return r;
    });
  }
}
