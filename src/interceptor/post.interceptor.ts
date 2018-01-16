/**
 * Created by ps11 on 15/01/18.
 */

import { Injectable } from '@angular/core';

import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthProvider} from "../providers/auth/auth";

@Injectable()
export class PostInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var postReq = null;
    if(req.headers.get('Authorization')) {
      postReq = req.clone({
        headers: req.headers.set('Authorization', AuthProvider.getToken())
      });
    }
    else{
      postReq = req.clone();
    }
    return next.handle(postReq).do(event => {
      if (event instanceof HttpResponse) {
        const time = new Date().toLocaleString();
        console.log(`Request happened at ${time}.`);
      }
    })
  }
}
