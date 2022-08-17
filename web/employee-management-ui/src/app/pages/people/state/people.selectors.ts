import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, PeopleState } from "./people.reducer";
import { FEATURE_NAME } from "../people.constants";

export const { selectAll } = adapter.getSelectors();

// feature selector
export const selectPeopleState = createFeatureSelector<PeopleState>(
  FEATURE_NAME
);

// child selectors
export const selectPeople = createSelector(
  selectPeopleState,
  state => selectAll(state)
);
export const selectLoading = createSelector(
  selectPeopleState,
  state => state.loading
);
