import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { reducer } from './people.reducer';
import { FEATURE_NAME } from "../people.constants";
import { EffectsModule } from "@ngrx/effects";
import { PeopleEffects } from "./people.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([PeopleEffects])
  ],
})
export class PeopleStateModule {
}
