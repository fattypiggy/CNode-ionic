import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const BASEURI = `https://cnodejs.org/api/v1`;

@Injectable()
export class SharedProvider {

  constructor(public http: Http) {
    console.log('Hello SharedProvider Provider');
  }

  getTopics() {
    return this.http.get(BASEURI + '/topics')
      .map((res: Response) => res.json());
  }
}
