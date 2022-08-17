import { createAction, props } from '@ngrx/store';
import { PersonInterface } from "../../../abstractions/models/person.model";

export const getPeople = createAction(
  '[People] Get People'
);

export const getPeopleSuccess = createAction(
  '[People] Get People Success',
  props<{ people: Array<PersonInterface> }>()
);

export const getPeopleFailure = createAction(
  '[People] Get People Failure',
  props<{ error: string }>()
);
