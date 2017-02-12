import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '../../_common/http-client';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(public http: HttpClient) {
  }


  /**
   * [toggleReadState 切换阅读状态]
   * @param  {[Object]} state [状态]
   */
  toggleReadState(from, state) {
    let creds = 'state=' + state + '&from=' + from;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://115.29.51.196:3001/updateReadState', creds, {
      headers: headers
    }).map(res => res.json());
  }

}
