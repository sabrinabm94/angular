import { Routes } from '@angular/router';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './features/gif-search/pages/not-found-page/not-found-page.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent }
];
