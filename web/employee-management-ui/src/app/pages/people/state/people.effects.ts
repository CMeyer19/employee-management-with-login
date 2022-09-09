import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonApiService } from "../../../services/person-api.service";
import {
  addPerson,
  addPersonFailure,
  addPersonSuccess,
  deletePerson,
  deletePersonFailure,
  deletePersonSuccess,
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
  updatePerson,
  updatePersonFailure,
  updatePersonSuccess
} from "./people.actions";

@Injectable()
export class PeopleEffects {
  loadPeople$ = createEffect(() => this._actions$.pipe(
      ofType(getPeople),
      switchMap(() => this._personApiService.getAll()
        .pipe(
          map(people => getPeopleSuccess({ people }))
        )
      ),
      catchError(error => of(getPeopleFailure({ error })))
    )
  );

  addPerson$ = createEffect(() => this._actions$.pipe(
      ofType(addPerson),
      map(action => action.person),
      switchMap(person => this._personApiService.add(person)
        .pipe(
          map(newPersonId => addPersonSuccess({
            person: {
              ...person,
              id: newPersonId
            }
          }))
        )
      ),
      catchError(error => of(addPersonFailure({ error })))
    )
  );

  updatePerson$ = createEffect(() => this._actions$.pipe(
      ofType(updatePerson),
      map(action => action.person),
      switchMap(person => this._personApiService.update(person.id, person)
        .pipe(
          map(() => updatePersonSuccess({ person }))
        )
      ),
      catchError(error => of(updatePersonFailure({ error })))
    )
  );

  deletePerson$ = createEffect(() => this._actions$.pipe(
      ofType(deletePerson),
      map(action => action.id),
      switchMap(id => this._personApiService.delete(id)
        .pipe(
          map(() => deletePersonSuccess({ id }))
        )
      ),
      catchError(error => of(deletePersonFailure({ error })))
    )
  );

  constructor(
    private _actions$: Actions,
    private _personApiService: PersonApiService
  ) {
  }
}
