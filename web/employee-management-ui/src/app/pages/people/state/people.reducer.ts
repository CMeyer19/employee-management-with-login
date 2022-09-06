import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addPersonFailure,
  addPersonSuccess,
  deletePersonFailure,
  deletePersonSuccess,
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
  updatePersonFailure,
  updatePersonSuccess
} from './people.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { IPerson } from "../../../abstractions/models/person.model";
import { FEATURE_NAME } from "../people.constants";

export interface PeopleState extends EntityState<IPerson> {
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<IPerson> = createEntityAdapter<IPerson>();

export const initialState: PeopleState = adapter.getInitialState({
  loading: false,
  error: ''
});

export const peopleFeature = createFeature({
  name: FEATURE_NAME,
  reducer: createReducer(
    initialState,

    on(
      getPeopleFailure,
      addPersonFailure,
      updatePersonFailure,
      deletePersonFailure,
      (state, { error }) => ({
        ...state,
        loading: false,
        error
      })
    ),

    on(getPeople, state => ({
      ...state,
      loading: true,
      error: ''
    })),
    on(getPeopleSuccess, (state, { people }) => adapter.setAll(people, { ...state, loading: false })),

    on(addPersonSuccess, (state, { person }) => adapter.addOne(person, state)),

    on(updatePersonSuccess, (state, { person }) => adapter.upsertOne(person, state)),

    on(deletePersonSuccess, (state, { id }) => adapter.removeOne(id, state)),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectEntities, // feature selector
} = peopleFeature;
