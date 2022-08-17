import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { getPeople } from "./people.actions";
import { selectAllPeople } from "./people.selectors";

@Injectable()
export class PeopleFacade {
  public readonly allPeople$ = this._store.select(selectAllPeople);

  constructor(private _store: Store) {
  }

  public getPeople(): void {
    this._store.dispatch(getPeople());
  }
}
