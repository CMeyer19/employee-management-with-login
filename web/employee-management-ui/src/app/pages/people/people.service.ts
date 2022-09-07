import { Injectable } from '@angular/core';
import { PersonApiService } from "../../services/person-api.service";
import { PeopleFacade } from "./state";
import { Observable } from "rxjs";
import { IPerson } from "../../abstractions/models/person.model";

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
