import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';  // for observable

@Injectable()
export class DbAccessorService {

  constructor(private http: Http) {
    console.log('running DB service...');
   }

  getAll() {
    return this.http.get('http://localhost:3000/showAll')
      .map(res => res.json());
  }

}
