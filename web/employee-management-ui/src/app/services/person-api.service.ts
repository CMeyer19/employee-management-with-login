import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { IPerson } from "../abstractions/models/person.model";
import { environment } from "@env";

@Injectable({ providedIn: 'root' })
export class PersonApiService {
  private readonly _peopleApiUrl: string = `${environment.routes.api}/api/People`;

  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private _http: HttpClient,
    private _oidcSecurityService: OidcSecurityService
  ) {
  }

  private setHeaders(): void {
    // TODO: I think this functionality needs to be moved to an HTTP interceptor.
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this._oidcSecurityService.getAccessToken().pipe(take(1)).subscribe(token => {
      if (token === '') return;

      const tokenValue: string = `Bearer ${token}`;
      this.headers = this.headers.append('Authorization', tokenValue);
    });
  }

  public getAll(): Observable<Array<IPerson>> {
    this.setHeaders();

    return this._http.get<Array<IPerson>>(
      this._peopleApiUrl,
      { headers: this.headers }
    );
  }

  public getById(id: string): Observable<IPerson> {
    this.setHeaders();

    return this._http.get<IPerson>(
      `${this._peopleApiUrl}/${id}`,
      { headers: this.headers }
    );
  }

  public add(itemToAdd: Omit<IPerson, 'id'>): Observable<string> {
    this.setHeaders();

    return this._http.post<string>(
      this._peopleApiUrl,
      JSON.stringify(itemToAdd),
      { headers: this.headers }
    );
  }

  public update(id: string, itemToUpdate: IPerson): Observable<void> {
    this.setHeaders();

    return this._http.put<void>(
      `${this._peopleApiUrl}/${id}`,
      JSON.stringify(itemToUpdate),
      { headers: this.headers }
    );
  }

  public delete(id: string): Observable<void> {
    this.setHeaders();

    return this._http.delete<void>(
      `${this._peopleApiUrl}/${id}`,
      { headers: this.headers }
    );
  }
}
