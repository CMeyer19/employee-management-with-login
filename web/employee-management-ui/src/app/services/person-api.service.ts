import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable({ providedIn: 'root' })
export class PersonApiService {
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private _http: HttpClient, private securityService: OidcSecurityService) {
  }

  private setHeaders(): any {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this.securityService.getAccessToken().subscribe(token => {
      if (token === '') return;

      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    });
  }

  public getPeople(): Observable<Array<any>>{
    this.setHeaders();

    return this._http.get<Array<any>>('https://localhost:44390/api/People', { headers: this.headers });
  }
}
