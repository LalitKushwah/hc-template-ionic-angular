import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginModel} from "../../models/login";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthProvider {
  private baseUrl: any = 'https://hc-india.hotwax.co/api/control';
  constructor(public http: HttpClient) {

  }


  doLogin(username, password): Observable<LoginModel>{
    return this.http.post<LoginModel>(`${this.baseUrl}/getAuthenticationToken`, {},{
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
      params: new HttpParams().set('USERNAME', username).append( 'PASSWORD', password)});
  }

  doLogout(){
    localStorage.removeItem('token');
  }

  static getToken(): string{
    return localStorage.getItem('token');
  }

}
