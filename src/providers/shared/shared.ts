import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const BASEURI = 'https://cnodejs.org/api/v1';
const LIMIT = 20;

@Injectable()
export class SharedProvider {

  constructor(public http: Http) {
    console.log('Hello SharedProvider Provider');
  }
  getTopics(tab: string, page?: number, limit = LIMIT) {
    return this.http.get(BASEURI + '/topics', {
      params: {
        "tab": tab,
        "page": page,
        "limit": limit
      }
    }).map(this.extractData);
    // .catch(this.errorHandler);
  }

  getTopic(id: string, accesstoken?: string) {
    return this.http.get(BASEURI + '/topic/' + id, {
      params: {
        "accesstoken": accesstoken
      }
    }).map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  // private errorHandler(error: any): Observable<any> {
  //   console.log("error:", error);
  //   return;
  // }
}
