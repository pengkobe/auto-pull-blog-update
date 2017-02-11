import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppState } from '../app.service';

@Injectable()
export class HttpClient {

    constructor(private http: Http) {}

    createAuthorizationHeader(headers: Headers, appstate: AppState) {
        var token = appstate.token;
        if (!token) {
            alert("请先登录！");
            return;
        } else {
            headers.append('Authorization', 'dsd ' + token);
        }
    }

    get(url, headers) {
        if (!headers) {
            headers = new Headers();
        }
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}
