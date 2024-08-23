import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './features/gif-search/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: 'search', loadChildren: () => import('./features/gif-search/gif-search.module').then(m => m.GifSearchModule) },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' }
];
