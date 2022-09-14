import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AutoLoginAllRoutesGuard } from "angular-auth-oidc-client";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutoLoginAllRoutesGuard] },
  {
    path: 'people',
    loadChildren: () => import('./pages/people/people.module').then(m => m.PeopleModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
