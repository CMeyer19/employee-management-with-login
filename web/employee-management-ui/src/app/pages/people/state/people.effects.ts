import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, tap } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PersonApiService } from "../../../services/person-api.service";
import { getPeople, getPeopleSuccess } from "./people.actions";

@Injectable()
export class PeopleEffects {
  loadMovies$ = createEffect(() => this._actions$.pipe(
      ofType(getPeople),
      mergeMap(() => this._personApiService.getAll()
        .pipe(
          map(people => getPeopleSuccess({ people })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _personApiService: PersonApiService
  ) {
  }
}
