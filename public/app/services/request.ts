import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class Request {
  private http: Http;
  private varHeaders: any = { headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

  public constructor(httpService: Http) {
    this.http = httpService;
  }

  get(path) {
    console.log('path',path);
    return this.http.get(path, this.varHeaders).map((response: Response) => {
      return response.json();
    });
  }

  post(path, data) {
    return this.http.post(path, JSON.stringify(data), this.varHeaders).map((response: Response) => {
      var r: any = response.json();
      return r;
    });
  }
}
