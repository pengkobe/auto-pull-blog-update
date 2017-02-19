import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '../../_common/http-client';
import { Observable } from 'rxjs';

@Injectable()
export class BloggerService {
  constructor(public http: HttpClient) {
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
    return this.http.post('bloggers', creds, {
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
    return this.http.post('bloggers', creds, {
      headers: headers
    }).map(res => res.json());
  }

  /**
   * 获取博主列表
   */
  getBloggers() {
    return this.http.get('bloggers').map(res => res.json());
  }

   /**
   * 获取新闻列表
   */
  getBloggerNews() {
    return this.http.get('blognews').map(res => res.json());
  }
}
