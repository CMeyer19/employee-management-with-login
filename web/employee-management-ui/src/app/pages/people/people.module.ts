import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { MatTableModule } from "@angular/material/table";
import { routing } from "./people.routes";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { PeopleEffects, PeopleFacade, reducer } from "./state";
import { StoreModule } from "@ngrx/store";
import { FEATURE_NAME } from "./people.constants";
import { UpsertPersonComponent } from "./dialogs/upsert-person/upsert-person.component";
import { PeopleService } from "./people.service";

@NgModule({
  declarations: [
    PeopleComponent,
    UpsertPersonComponent
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
    ReactiveFormsModule,
  ],
  providers: [
    PeopleFacade,
    PeopleService
  ]
})
export class PeopleModule {
  constructor(private _peopleService: PeopleService) {
    this._peopleService.initialise();
  }
}
