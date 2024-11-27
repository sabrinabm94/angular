// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { GuestGuard } from './core/guards/guest.guard';
import { NotFoundPageComponent } from './features/quiz/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  //logados
  {
    path: '',
    loadComponent: () =>
      import('./features/quiz/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./features/quiz/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'quiz/:id',
    loadComponent: () =>
      import('./features/quiz/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'result/:id',
    loadComponent: () =>
      import('./features/quiz/pages/results-page/results-page.component').then(
        (m) => m.ResultsPageComponent
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    loadComponent: () =>
      import(
        './features/user/components/user-logout/user-logout.component'
      ).then((m) => m.UserLogoutComponent),
    canActivate: [AuthGuard],
  },

  //deslogados
  {
    path: 'login',
    loadComponent: () =>
      import('./features/user/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './features/user/pages/register-page/register-page.component'
      ).then((m) => m.RegisterPageComponent),
    canActivate: [GuestGuard],
  },

  //todos
  { path: '**', component: NotFoundPageComponent },
];
