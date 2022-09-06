import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { addPerson, deletePerson, getPeople, updatePerson } from "./people.actions";
import { selectPeople } from "./people.selectors";
import { IPerson } from "../../../abstractions/models/person.model";

@Injectable()
export class PeopleFacade {
  public readonly allPeople$ = this._store.select(selectPeople);

  constructor(private _store: Store) {
  }

  public getPeople(): void {
    this._store.dispatch(getPeople());
  }

  public addPerson(person: IPerson): void {
    this._store.dispatch(addPerson({ person }));
  }

  public updatePerson(person: IPerson): void {
    this._store.dispatch(updatePerson({ person }));
  }

  public deletePerson(id: string): void {
    this._store.dispatch(deletePerson({ id }));
  }
}
