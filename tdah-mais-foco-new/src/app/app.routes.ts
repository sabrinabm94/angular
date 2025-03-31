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
  // resultado de quiz
  {
    path: 'result/:id',
    loadComponent: () =>
      import('./features/quiz/pages/results-page/results-page.component').then(
        (m) => m.ResultsPageComponent
      ),
    canActivate: [AuthGuard], // Apenas usuários logados
  },

  // verificação de perfil
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./features/user/pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [AuthGuard], // Apenas usuários logados
  },

  //edição de perfil
  {
    path: 'user-management/:id',
    loadComponent: () =>
      import(
        './features/admin/user/pages/user-manage-page/user-manage-page.component'
      ).then((m) => m.UserManagePageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },

  //listagem de usuários
  {
    path: 'users',
    loadComponent: () =>
      import(
        './features/admin/user/pages/user-list-page/user-list-page.component'
      ).then((m) => m.UserListPageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },

  //cadastro de perguntas
  {
    path: 'question-register',
    loadComponent: () =>
      import(
        './features/admin/quiz/question/pages/question-register-page/question-register-page.component'
      ).then((m) => m.QuestionRegisterPageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },

  // edição de pergunta
  {
    path: 'question-management/:id',
    loadComponent: () =>
      import(
        './features/admin/quiz/question/pages/question-manage-page/question-manage-page.component'
      ).then((m) => m.QuestionManagePageComponent),
    canActivate: [AdminGuard], // Apenas usuários administradores
  },

  // listagem de perguntas
  {
    path: 'questions',
    loadComponent: () =>
      import(
        './features/admin/quiz/question/pages/question-list-page/question-list-page.component'
      ).then((m) => m.QuestionListPageComponent),
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
    path: 'user-register',
    loadComponent: () =>
      import(
        './features/user/pages/register-page/register-page.component'
      ).then((m) => m.RegisterPageComponent),
    canActivate: [GuestGuard], // Apenas usuários deslogados
  },

  // Rota para páginas não encontradas
  { path: '**', component: NotFoundPageComponent },
];
