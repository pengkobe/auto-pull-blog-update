import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class Title {
  value = 'Angular 2';
  constructor(public http: Http) {

  }
  
  /**
   * 获取Token
   */
  getData() {
    console.log('Title#getData(): Get Data');
    let username = 'py';
    let password = '123';
    let creds = "username=" + username + "&password=" + password + "&extra=color";
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:3001/tokens', creds, {
      headers: headers
    })
      .map(res => res.json());

    // return this.http.get('/assets/data.json')
    //   .map(res => res.json());
    // return {
    //   value: 'AngularClass'
    // };
  }
  /**
   * 获取博客新闻
   */
  getBloggerNews(token) {
    let headers = new Headers();
    headers.append('Authorization', 'dsd ' + token);
    return this.http.get('http://localhost:3001/blognews', {
      headers: headers
    })
      .map(res => res.text());   //2
  }

}
