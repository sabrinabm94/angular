import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './features/gif-search/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/gif-search/gif-search.module').then(m => m.GifSearchModule) },
  //{ path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
  //{ path: 'user/:userName', component: HomePageComponent },
];
