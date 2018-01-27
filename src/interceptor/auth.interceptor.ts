import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import  'rxjs/add/operator/do';
import {App} from "ionic-angular";
import {AuthService} from "../shared/AuthService";
import {LoginPage} from "../pages/login/login";

// We should rename this interceptor to AuthInterceptor
//@Lalit: Resolved
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

// Http interceptor is powerful object, the API is concise so read every word with attention.
// https://angular.io/api/common/http/HttpInterceptor

  // Is this constructor empty for a reason or is it just WIP?
  /*@Lalit: This constructor is used to inject App and AuthService dependency it is called 'Constructor Injection'. We can also use this
    for initialization in future*/
  //https://angular.io/guide/dependency-injection-pattern
  constructor(public app: App,public authService:AuthService){};

  // This is where the fun happens :)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest =req.clone();

    // Is local storage injected in this interceptor or is it a global variable.
    // @Lalit: localStorage is a global varibale
    // We should be careful about using global variables.
    let authenticationToken = localStorage.getItem('token');

    // If we are going to clone the req anyways, why not keep it out of the following condition statement and clone it as we initialize the variable.
    // @Lalit: Resolved
    if(authenticationToken != null) {
      //clone method also facilitates us to add the param in request
      cloneRequest = cloneRequest.clone({
        // I don't understand following line. Are we seeting the token in orignal req object ? asking because you told me we should not edit req object.
        //Reply: No we are adding token in the cloned HttpRequest object because original req object (req) is immutable
        headers: req.headers.set('Bearer',authenticationToken).append('Content-Type', 'application/json')
      });
    }


    // The code we are writing is nice and compact but hard to debug for old school person like me.

    // We should call the next.handle and get the return object in a variable.
    // Then see what is the content on it.
    // as per the api of handle method, httpevent is returned and it is observable
    //Discussion: If we assigning next.handle into an onject so we have to subscribe it and  it makes api calls twice, for better understanding please refer below link
    //https://stackoverflow.com/questions/45664874/interceptor-making-two-calls-in-api

    // What do we really want to do with it ?
    // https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87


    // I see that we are calling, next.handle.
    // I also know that handle method returns HttpEvent
    // What is the role of "do" ?
    // http://reactivex.io/documentation/operators/do.html

    return next.handle(cloneRequest).do((err: any) => {
        // If we don't want to do anything on success, we should not even add a listener to it.
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
