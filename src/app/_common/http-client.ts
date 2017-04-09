import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppState } from '../app.service';

@Injectable()
export class HttpClient {

    constructor(private http: Http,public appstate: AppState) {}

    createAuthorizationHeader(headers: Headers) {
        var token = this.appstate.token;
        if (!token) {
            alert("请先登录！");
            return;
        } else {
            headers.append('Authorization', 'dsd ' + token);
        }
    }

    get(url, headers?) {
        if (!headers) {
            headers = new Headers();
        }else{
            headers = headers.headers;
        }
        url = this.getFullUrl(url);
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });;
    }

    post(url, data,headers?) {
         if (!headers) {
            headers = new Headers();
        }else{
            headers = headers.headers;
        }
        url = this.getFullUrl(url);
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    patch(url, data,headers?) {
         if (!headers) {
            headers = new Headers();
        }else{
            headers = headers.headers;
        }
        url = this.getFullUrl(url);
        this.createAuthorizationHeader(headers);
        return this.http.patch(url, data, {
            headers: headers
        });
    }

    getFullUrl(url){
        return this.appstate.backendUrl +url;
    }
}
