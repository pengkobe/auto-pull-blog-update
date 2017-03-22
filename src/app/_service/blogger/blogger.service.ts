import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '../../_common/http-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Blogger } from 'blogger.service';

@Injectable()
export class BloggerService {
  public subject: Subject<any> = new Subject<any>();

  constructor(public http: HttpClient) {
  }

  public get blogerList(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * 获取博主列表
   */
  getBloggers() {
    return this.http.get('bloggers')
      .map(res => res.json()).subscribe(data => {
        this.subject.next(Object.assign({}, data));
      });
  }

  /**
   * [postBlogger 添加博主]
   * @param  {[Object]} model [博主实体对象]
   * @return {[Observable]}   [后台返回数据]
   */
  postBlogger(model) {
    const name = model.name;
    const url = model.url;
    const taskjs = model.taskjs;
    let creds = 'name=' + name + '&url=' + url + '&taskjs=' + taskjs;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('bloggers', creds, {
      headers: headers
    }).map(res => res.json());
  }

  /**
   * [editBlogger 修改博主信息]
   * @param  {[Object]} model [博主实体对象]
   * @return {[Observable]}   [后台返回数据]
   */
  editBlogger(model) {
    const _id = model._id;
    const name = model.name;
    const url = model.url;
    const taskjs = model.taskjs;
    let creds = 'name=' + name + '&url=' + url + '&taskjs=' + taskjs;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('editBlogger/'+_id, creds, {
      headers: headers
    }).map(res => res.json());
  }

  /**
   * 添加 blogger ( for test)
   */
  // addBlogger() {
  //   const name = 'yinwang';
  //   const url = 'http://yinwang.org';
  //   const taskjs  = 'yinwang.org.js';
  //   let creds = 'name=' + name + '&url=' + url + '&taskjs=' + taskjs;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   return this.http.post('bloggers', creds, {
  //     headers: headers
  //   }).map(res => res.json());
  // }

}
