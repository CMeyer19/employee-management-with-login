import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPerson } from "../abstractions/models/person.model";
import { environment } from "@env";

@Injectable({ providedIn: 'root' })
export class PersonApiService {
  private readonly _peopleApiUrl: string = `${environment.routes.api}/api/People`;

  constructor(
    private _http: HttpClient
  ) {
  }

  public getAll(): Observable<Array<IPerson>> {
    return this._http.get<Array<IPerson>>(
      this._peopleApiUrl
    );
  }

  public getById(id: string): Observable<IPerson> {
    return this._http.get<IPerson>(
      `${this._peopleApiUrl}/${id}`
    );
  }

  public add(itemToAdd: Omit<IPerson, 'id'>): Observable<string> {
    return this._http.post<string>(
      this._peopleApiUrl,
      JSON.stringify(itemToAdd)
    );
  }

  public update(id: string, itemToUpdate: IPerson): Observable<void> {
    return this._http.put<void>(
      `${this._peopleApiUrl}/${id}`,
      JSON.stringify(itemToUpdate)
    );
  }

  public delete(id: string): Observable<void> {
    return this._http.delete<void>(
      `${this._peopleApiUrl}/${id}`
    );
  }
}
