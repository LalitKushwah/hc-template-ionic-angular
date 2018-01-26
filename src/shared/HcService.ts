import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";
@Injectable()
export class HcService {

  // I don't understant the logic here. Why will be break the domain name in so many parts. 
  // We don't have rule that all clients will be subdomain of hotwax.co
  
  private baseUrlPrefix: string = 'https://';
  private baseUrlSuffix: string = '.hotwax.co/api/control/';
  private loginServiceRoute = 'getAuthenticationToken';
  constructor(private http: HttpClient){}

  doLogin(url: string, username: string, password: string): any{
    return this.http.post(this.baseUrlPrefix + url + this.baseUrlSuffix + this.loginServiceRoute,{},
      {params: new HttpParams().set('USERNAME', username).append('PASSWORD', password),
        observe: 'response'})
  }

  doLogout(){
      // Do we want to inform the server? Why not tell the server that that the token is invalid now.
    localStorage.removeItem('token');
   // this.navCtrl.push(LoginPage);
  }

  fireCachedRequest(cachedRequest) {
      // I am not convinced with this respnsibility assignment.
      // If this code is responsible for continuing user on their journer after login, it should be part of the invercepter.
    return this.http.request(cachedRequest);
  }
}
