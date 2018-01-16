import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
  private http: Http;
  // private paramHeaders: any = new Headers({ 'Content-Type': 'application/json','Accept':'application/json'});
  // private paramHeaders: any = new Headers({'Accept':'application/json'});

  private paramOptions: any;

  public constructor(private httpService: Http) {
    this.http = httpService;

    // this.paramOptions = new RequestOptions({ headers: this.paramHeaders});
  }

  get(path) {
    return this.http.get(path, this.getHeaders()).map((response: Response) => {
      return response.json();
    });

  }

  post(path, data) {
    return this.http.post(path, JSON.stringify(data), this.getHeaders()).map((response: Response) => {
      var r: any = response.json();
      return r;
    });
  }

  put(path, data) {
    return this.http.put(path, JSON.stringify(data), this.getHeaders()).map((response: Response) => {
      var r: any = response.json();
      return r;
    });
  }


  getUser() {
    let userStr = sessionStorage.getItem('user');

    if (userStr) {
      return JSON.parse(userStr);
    }
    return {};
  }

  private getHeaders() {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    this.paramOptions = new RequestOptions({ headers: headers });

    let user = this.getUser();
    let headerInfo = { _id: user._id, ap: user.ap, an: user.an, oID: user.oID }

    this.paramOptions.headers.append('user', JSON.stringify(headerInfo));
    return this.paramOptions;
  }

}
