import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

// I don't see this class doing anything with collected failed request.
//@Lalit:
// @todo:
export class CollectFailedRequestService {

// We should not follow the cached request pattern.
  cachedRequest: HttpRequest<any> = null;
  targetScreen: string= null;

  public collectFailedRequest(request): void {
    this.cachedRequest = request;
    console.log('Request Cached successfully');
  }

}
