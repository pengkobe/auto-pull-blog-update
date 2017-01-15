import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class BloggerService {
  constructor(public http: Http) {
  }


  /**
   * [postBlogger 添加博主]
   * @param  {[Object]} model [博主实体对象]
   * @return {[Observable]}   [后台返回数据]
   */
  postBlogger(model){
    const name = model.name;
    const url = model.url;
    const taskjs  = model.taskjs;
    let creds = 'name=' + name + '&url=' + url + '&taskjs=' + taskjs;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:3001/bloggers', creds, {
      headers: headers
    }).map(res => res.json());
  }
  /**
   * 获取Token
   */
  addBlogger() {
    const name = 'yinwang';
    const url = 'http://yinwang.org';
    const taskjs  = 'yinwang.org.js';
    let creds = 'name=' + name + '&url=' + url + '&taskjs=' + taskjs;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:3001/bloggers', creds, {
      headers: headers
    }).map(res => res.json());
  }

   /**
   * 获取新闻列表
   */
  getBloggerNews() {
    return this.http.get('http://localhost:3001/blognews').map(res => res.json());

    // let headers = new Headers();
    // headers.append('Authorization', 'dsd ' + token);
    // return this.http.get('http://localhost:3001/blognews', {
    //   headers: headers
    // }).map(res => res.text());   // 2
  }
}
