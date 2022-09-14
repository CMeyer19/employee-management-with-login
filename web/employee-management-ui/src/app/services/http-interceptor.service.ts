import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { environment } from "@env";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private readonly _contentType: string = 'Content-Type';
  private readonly _accept: string = 'Accept';

  constructor(private _oidcSecurityService: OidcSecurityService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.startsWith(environment.routes.auth)) return next.handle(httpRequest.clone());

    return this._oidcSecurityService.getAccessToken().pipe(
      take(1),
      switchMap(token => {
        let headers: HttpHeaders = new HttpHeaders();

        if (!httpRequest.headers.has(this._contentType)) headers = headers.set(this._contentType, 'application/json');
        if (!httpRequest.headers.has(this._accept)) headers = headers.set(this._accept, 'application/json');
        if (!!token) headers = headers.set('Authorization', `Bearer ${token}`);

        return next.handle(httpRequest.clone({ headers }));
      })
    );
  }
}
