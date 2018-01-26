import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import  'rxjs/add/operator/do';
import {App} from "ionic-angular";
import {AuthService} from "../shared/AuthService";
import {LoginPage} from "../pages/login/login";

// We should rename this interceptor to AuthIntercepor 
@Injectable()
export class PostInterceptor implements HttpInterceptor {

// Http interceptor is powerful object, the API is concise so read every word with attention.
// https://angular.io/api/common/http/HttpInterceptor

  // Is this constructor empty for a reason or is it just WIP?
  constructor(public app: App,public authService:AuthService){};

  // This is where the fun happens :)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest =null;
    
    // Is local storage injected in this interceptor or is it a global variable.
    // We should be careful about using global variables.
    let authenticationToken = localStorage.getItem('token');

    // If we are going to clone the req anyways, why not keep it out of the following condition statement and clone it as we initialize the variable.
    if(authenticationToken != null) {
      cloneRequest = req.clone({
        // I don't understand following line. Are we seeting the token in orignal req object ? asking because you told me we should not edit req object.  
        headers: req.headers.set('Bearer',authenticationToken).append('Content-Type', 'application/json')
      });
    }
    else{
      cloneRequest = req.clone();
    }
    
    // I see that we are calling, next.handle. 
    // I also know that handle method returns HttpEvent
    // What is the role of "do" ?
    // http://reactivex.io/documentation/operators/do.html
    
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
    // What is being returned from this function?
    
  }
}
