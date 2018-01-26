import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

  cachedRequest: HttpRequest<any> = null;
  targetScreen: string= null;

  public collectFailedRequest(request): void {
    this.cachedRequest = request;
    console.log('Request Cached successfully')
  }

}
