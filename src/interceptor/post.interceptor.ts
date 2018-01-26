import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import  'rxjs/add/operator/do';
import {App} from "ionic-angular";
import {AuthService} from "../shared/AuthService";
import {LoginPage} from "../pages/login/login";

@Injectable()
export class PostInterceptor implements HttpInterceptor {

  constructor(public app: App,public authService:AuthService){};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest =null;
      let authenticationToken = localStorage.getItem('token');

   // If we are going to clone the req anyways, why not keep it out of the following condition statement and clone it as we initialize the variable.
    if(authenticationToken != null) {
      cloneRequest = req.clone({
        headers: req.headers.set('Bearer',authenticationToken).append('Content-Type', 'application/json')
      });
    }
    else{
      cloneRequest = req.clone();
    }

    return next.handle(cloneRequest).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // Remove invalid token
          localStorage.removeItem('token');

          //Store failed request and component name
          this.authService.collectFailedRequest(cloneRequest);
          this.authService.targetScreen = this.app.getActiveNavs().pop().getActive().name;

          //Redirect user to login screen
          this.app.getActiveNav().push(LoginPage);
        }
      }
    });
  }
}
