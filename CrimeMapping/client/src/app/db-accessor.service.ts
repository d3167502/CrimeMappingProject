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

  addOne(newRecord) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/add', JSON.stringify(newRecord), {headers: headers})
      .map(res => res.json());
  }

}
