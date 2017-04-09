import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AppState } from '../../app.service';

@Injectable()
export class LoginService {
  constructor(public http: Http ,public appState : AppState) {

  }
  /**
   * 获取Token
   */
  login(username, password) {
    console.log('Title#getData(): Get Data');
    let creds = 'username=' + username + '&password=' + password + '&extra=color';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var bUrl = this.appState.backendUrl;
    return this.http.post( bUrl+ 'tokens', creds, {
      headers: headers
    }).map(res => res.json());
  }
}
