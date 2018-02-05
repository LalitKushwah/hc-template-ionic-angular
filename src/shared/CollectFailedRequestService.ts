import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

// I don't see this class doing anything with collected failed request.
//@Lalit:
// @todo:
/*@lalit: Function of this file is to collect the failed request and we are making it as a service according to the
* best practice of angular so that if we require this file, we can inject it and use accordingly*/
//we are processing failed request in HcService.ts because it is the only point in our SDK which is responsible for http request
export class CollectFailedRequestService {

// We should not follow the cached request pattern.
  cachedRequest: HttpRequest<any> = null;
  targetScreen: string= null;

  public collectFailedRequest(request): void {
    this.cachedRequest = request;
    console.log('Request Cached successfully');
  }

}
