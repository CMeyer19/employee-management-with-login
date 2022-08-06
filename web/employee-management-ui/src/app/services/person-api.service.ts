import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { PersonInterface } from "../abstractions/models/person.model";
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
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this._oidcSecurityService.getAccessToken().subscribe(token => {
      if (token === '') return;

      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    });
  }

  public getAll(): Observable<Array<PersonInterface>> {
    this.setHeaders();

    return this._http.get<Array<PersonInterface>>(
      this._peopleApiUrl,
      { headers: this.headers }
    );
  }

  public getById(id: string): Observable<PersonInterface> {
    this.setHeaders();

    return this._http.get<PersonInterface>(
      `${this._peopleApiUrl}/${id}`,
      { headers: this.headers }
    );
  }

  public add(itemToAdd: Omit<PersonInterface, 'id'>): Observable<string> {
    this.setHeaders();

    return this._http.post<string>(
      this._peopleApiUrl,
      JSON.stringify(itemToAdd),
      { headers: this.headers }
    );
  }

  public update(id: string, itemToUpdate: any): Observable<any> {
    this.setHeaders();

    return this._http.put<any>(
      `${this._peopleApiUrl}/${id}`,
      JSON.stringify(itemToUpdate),
      { headers: this.headers }
    );
  }

  public delete(id: string): Observable<any> {
    this.setHeaders();

    return this._http.delete<any>(
      `${this._peopleApiUrl}/${id}`,
      { headers: this.headers }
    );
  }
}
