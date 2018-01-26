import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

// Name suggests that the service is responsible for authorization. The methods on it does not reflect the expected behavior.
export class AuthService {

// We should not follow the cached request pattern.
  cachedRequest: HttpRequest<any> = null;
  targetScreen: string= null;

  public collectFailedRequest(request): void {
    this.cachedRequest = request;
    console.log('Request Cached successfully')
  }

}
