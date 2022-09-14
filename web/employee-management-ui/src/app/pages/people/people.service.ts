import { Injectable } from '@angular/core';
import { IPerson, PersonApiService } from "@apis/person";
import { PeopleFacade } from "./state";
import { Observable } from "rxjs";

@Injectable()
export class PeopleService {
  public readonly allPeople$: Observable<Array<IPerson>> = this._peopleFacade.allPeople$;

  constructor(
    private _personApiService: PersonApiService,
    private _peopleFacade: PeopleFacade,
  ) {
  }

  public addPerson(person: IPerson): void {
    this._peopleFacade.addPerson(person);
  }

  public updatePerson(person: IPerson): void {
    this._peopleFacade.updatePerson(person);
  }

  public deletePerson(id: string): void {
    this._peopleFacade.deletePerson(id);
  }

  public initialise(): void {
    this._peopleFacade.getPeople();
  }
}
