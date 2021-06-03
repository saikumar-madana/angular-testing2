import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = environment.apiUrl.trim();
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  localData = true;
  authenticated = false;
  URLS: any = {
    users: '/users?page={page}',
    userDetails: '/users/{id}'
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  /**
   * this function makes a http request to get the data based on the requested api
   */
  getServerData(data: any): Observable<any> {
    const url: string = data.apiUrl;
    return this.http.get(url);
  }


  /**
   * This function makes a http request to get the data based on the
   * requested api
   * @param data Object - payload of the request
   * Example:
   * data = {url: 'users', method: 'get', body: {}, local: true, // send true to get local json data}
   */
  callApi(data: HttpPayload): Observable<any> {
    const options = {
      headers: this.getHeaders(data.noHeaders),
      params: data.params ? data.params : null,
      body: data.body ? data.body : null
    };
    let url = this.getUrl(data.url);
    if (data.pathVariables) {
      data.pathVariables.forEach((each) => {
        url = url.replace(/{.*?}/, each.toString());
      });
    }
    try {
      return this.http.request(data.method, url, options).pipe(map(res => {
        const response: any = res;
        return response;
      }));
    } catch (err) {
      throw new Error('Error in getting data');
    }
  }

  getHeaders(noHeaders: any): any {
    let headers;
    if (noHeaders) {
      headers = new HttpHeaders();
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    return headers;
  }

  getUrl(url: string): string {
    return `${this.BASE_URL}${this.URLS[url]}`;
  }
}

export class HttpPayload {
  url!: string;
  method!: string;
  body?: any;
  params?: any;
  noHeaders?: boolean;
  hideLoader?: boolean;
  pathVariables?: (string|number)[];
}
