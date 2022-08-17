import { createFeature, createReducer, on } from '@ngrx/store';
import { getPeople, getPeopleFailure, getPeopleSuccess } from './people.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { PersonInterface } from "../../../abstractions/models/person.model";
import { FEATURE_NAME } from "../people.constants";

export interface PeopleState extends EntityState<PersonInterface> {
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<PersonInterface> = createEntityAdapter<PersonInterface>();

export const initialState: PeopleState = adapter.getInitialState({
  loading: false,
  error: ''
});

export const peopleFeature = createFeature({
  name: FEATURE_NAME,
  reducer: createReducer(
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
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectEntities, // feature selector
} = peopleFeature;
