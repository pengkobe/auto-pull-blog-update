import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  value = 'Angular 2';
  constructor(public http: Http) {

  }
  /**
   * 获取Token
   */
  login(username, password) {
    console.log('Title#getData(): Get Data');
    let creds = 'username=' + username + '&password=' + password + '&extra=color';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://115.29.51.196:3001/tokens', creds, {
      headers: headers
    }).map(res => res.json());
  }
}
