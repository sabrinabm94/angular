import { Routes } from '@angular/router';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';
import { NotFoundComponent } from './features/gif-search/pages/not-found-page/not-found.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundComponent }
];
