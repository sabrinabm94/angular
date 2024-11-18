// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomePageComponent } from './features/quiz/pages/home-page/home-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserLogoutComponent } from './features/user/components/user-logout/user-logout.component';
import { GuestGuard } from './core/guards/guest.guard';
import { LoginPageComponent } from './features/user/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './features/quiz/pages/not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  //logados
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: UserLogoutComponent,
    canActivate: [AuthGuard],
  },

  //deslogados
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },

  //todos
  { path: '**', component: NotFoundPageComponent },
];
