import { createAction, props } from '@ngrx/store';
import { IPerson } from "../../../abstractions/models/person.model";

export const getPeople = createAction(
  '[People] Get People'
);

export const getPeopleSuccess = createAction(
  '[People] Get People Success',
  props<{ people: Array<IPerson> }>()
);

export const getPeopleFailure = createAction(
  '[People] Get People Failure',
  props<{ error: string }>()
);

export const addPerson = createAction(
  '[People] Add Person',
  props<{ person: IPerson }>()
);

export const addPersonSuccess = createAction(
  '[People] Add Person Success',
  props<{ person: IPerson }>()
);

export const addPersonFailure = createAction(
  '[People] Add Person Failure',
  props<{ error: string }>()
);

export const updatePerson = createAction(
  '[People] Update Person',
  props<{ person: IPerson }>()
);

export const updatePersonSuccess = createAction(
  '[People] Update Person Success',
  props<{ person: IPerson }>()
);

export const updatePersonFailure = createAction(
  '[People] Update Person Failure',
  props<{ error: string }>()
);

export const deletePerson = createAction(
  '[People] Delete Person',
  props<{ id: string }>()
);

export const deletePersonSuccess = createAction(
  '[People] Delete Person Success',
  props<{ id: string }>()
);

export const deletePersonFailure = createAction(
  '[People] Delete Person Failure',
  props<{ error: string }>()
);
