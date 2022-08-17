import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { MatTableModule } from "@angular/material/table";
import { routing } from "./people.routes";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AddPersonComponent } from './dialogs/add-person/add-person.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { PeopleFacade } from "./state/people.facade";
import { EffectsModule } from "@ngrx/effects";
import { PeopleEffects, reducer } from "./state";
import { StoreModule } from "@ngrx/store";
import { FEATURE_NAME } from "./people.constants";

@NgModule({
  declarations: [
    PeopleComponent,
    AddPersonComponent
  ],
  imports: [
    routing,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([PeopleEffects]),
  ],
  providers: [PeopleFacade]
})
export class PeopleModule {
  constructor(private _facade: PeopleFacade) {
    this._facade.getPeople();
  }
}
