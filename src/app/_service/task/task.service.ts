import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(public http: Http) {
  }

  /**
   * 获取Token
   */
  getToken() {
    let username = 'py';
    let password = '123';
    let creds = 'username=' + username + '&password=' + password + '&extra=color';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:3001/tokens', creds, {
      headers: headers
    }).map(res => res.json());

  }

  /**
   * 开启后台任务
   */
  startTasks() {
    return this.http.get('http://localhost:3001/begintasks').map(res => res.json());
  }

   /**
   * 获取新闻列表
   */
  getBloggerNews(token) {
    let headers = new Headers();
    headers.append('Authorization', 'dsd ' + token);
    return this.http.get('http://localhost:3001/blognews', {
      headers: headers
    }).map(res => res.text());   // 2
  }
}
