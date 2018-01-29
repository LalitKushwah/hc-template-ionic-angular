import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class HcService {

  // I don't understant the logic here. Why will be break the domain name in so many parts.
  // We don't have rule that all clients will be subdomain of hotwax.co
  // Reply: Ans -> It is just WIP
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
      // @Lalit: Yes, we should inform to server. Till now there isn't any service for expiring token at server
    localStorage.removeItem('token');
  }

  fireCachedRequest(cachedRequest) {
      // I am not convinced with this respnsibility assignment.
      // If this code is responsible for continuing user on their journer after login, it should be part of the invercepter.\
    /*@Lalit: This code is only for firing cached http request as this file is used for firing http request, I thik this code should be here
    we have done the responsibilty assignment in the login.ts which decides what will be the next screen  */
    //@Lalit: Why we are using login.ts for responsibility assignment?
    /* @Lalit: As we have only a single entry point for login in our SDK so we should decide our next action after login using this single entry point
      whether it should be  normal flow or interupt one*/
    //We should keep our Interceptor generic, responsible only for attaching headers and checking authentication
    return this.http.request(cachedRequest);
  }
}
