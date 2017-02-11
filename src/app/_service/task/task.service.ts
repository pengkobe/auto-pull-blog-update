import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '../../_common/http-client';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(public http: HttpClient) {
  }

  /**
   * 开启后台任务
   */
  startTasks() {
    return this.http.get('http://localhost:3001/begintasks').map(res => res.json());
  }

}
