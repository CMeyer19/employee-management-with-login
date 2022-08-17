import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, PeopleState } from "./people.reducer";
import { FEATURE_NAME } from "../people.constants";
import { PersonInterface } from "../../../abstractions/models/person.model";

export const { selectAll } = adapter.getSelectors();

export const selectPeopleState = createFeatureSelector<PeopleState>(FEATURE_NAME);

export const selectAllPeople = createSelector(
  selectPeopleState,
  peopleState => {
    debugger;
    const one: Array<PersonInterface> = (Object.values(peopleState?.entities) || []).filter(x => x !== undefined) as Array<PersonInterface> || [];
    return one;
  }
);
