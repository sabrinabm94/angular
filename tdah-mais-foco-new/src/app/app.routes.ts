import { Routes } from '@angular/router';
import { GuestGuard } from './core/guards/guest.guard';
import { NotFoundPageComponent } from './features/quiz/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/adm.guard';

export const appRoutes: Routes = [
  // Rota acessível por todos (logados e deslogados)
  {
    path: 'quiz',
    loadComponent: () =>
      import('./features/quiz/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },

  // Rotas para usuários logados
  {
    path: 'result/:id',
    loadComponent: () =>
      import('./features/quiz/pages/results-page/results-page.component').then(
        (m) => m.ResultsPageComponent
      ),
    canActivate: [AuthGuard], // Apenas usuários logados
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./features/user/pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [AuthGuard], // Apenas usuários logados
  },
  {
    path: 'logout',
    loadComponent: () =>
      import(
        './features/user/components/user-logout/user-logout.component'
      ).then((m) => m.UserLogoutComponent),
    canActivate: [AuthGuard], // Apenas usuários logados
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import(
        './features/admin/pages/user-manage-page/user-manage-page.component'
      ).then((m) => m.UserManagePageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './features/admin/pages/user-list-page/user-list-page.component'
      ).then((m) => m.UserListPageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },

  // Rotas para usuários deslogados
  {
    path: 'login',
    loadComponent: () =>
      import('./features/user/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [GuestGuard], // Apenas usuários deslogados
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './features/user/pages/register-page/register-page.component'
      ).then((m) => m.RegisterPageComponent),
    canActivate: [GuestGuard], // Apenas usuários deslogados
  },

  // Rota para páginas não encontradas
  { path: '**', component: NotFoundPageComponent },
];
