import { Action, createReducer, on } from '@ngrx/store';
import { getPeople, getPeopleFailure, getPeopleSuccess } from './people.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { PersonInterface } from "../../../abstractions/models/person.model";

export interface PeopleState extends EntityState<PersonInterface> {
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<PersonInterface> = createEntityAdapter<PersonInterface>();

export const initialState: PeopleState = adapter.getInitialState({
  loading: false,
  error: ''
});

const peopleReducer = createReducer(
  initialState,

  on(getPeople, state => ({
    ...state,
    loading: true,
    error: ''
  })),

  on(getPeopleSuccess, (state, { people }) => adapter.setAll(people, { ...state, loading: false })),

  on(getPeopleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

export function reducer(state: PeopleState | undefined, action: Action) {
  return peopleReducer(state, action);
}
