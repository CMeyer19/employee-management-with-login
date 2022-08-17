import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { getPeople } from "./people.actions";
import { selectPeople } from "./people.selectors";

@Injectable()
export class PeopleFacade {
  public readonly allPeople$ = this._store.select(selectPeople);

  constructor(private _store: Store) {
  }

  public getPeople(): void {
    this._store.dispatch(getPeople());
  }
}
