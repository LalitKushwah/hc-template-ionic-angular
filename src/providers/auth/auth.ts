import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginModel} from "../../models/login";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthProvider {
  private baseUrl: string = 'https://hc-india.hotwax.co/api/control';
  constructor(public http: HttpClient) {

    if(localStorage.getItem('baseUrl')!= null)
    this.baseUrl = 'https://'+localStorage.getItem('baseUrl')+'.hotwax.co/api/control';

  }


  doLogin(username, password): Observable<LoginModel>{
    console.log('===========this.baseUrl=========',this.baseUrl);
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
