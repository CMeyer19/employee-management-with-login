import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private _oidcSecurityService: OidcSecurityService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._oidcSecurityService.getAccessToken().pipe(
      take(1),
      switchMap(token => {
        const headers: HttpHeaders = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        return next.handle(httpRequest.clone({ headers }));
      })
    );
  }
}
