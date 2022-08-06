import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from "./people.component";

const peopleRoutes: Routes = [
  { path: '', component: PeopleComponent }
];

export const routing = RouterModule.forChild(peopleRoutes);
