import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { QuizComponent } from './features/quiz/components/quiz/quiz.component';
import { LoginPageComponent } from './features/user/pages/login-page/login-page.component';
import { HomePageComponent } from './features/quiz/pages/home-page/home-page.component';

export const routes: Routes = [
  /* {
    path: '',
    loadChildren: () =>
      import('./features/user/feature-user.module').then(
        (m) => m.FeatureUserModule
      ),
    canActivate: [AuthGuard], // Apenas para usuários não logados
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/quiz/feature-quiz.module').then(
        (m) => m.FeatureQuizModule
      ),
    canActivate: [AuthGuard], // Apenas para usuários logados
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./features/user/feature-user.module').then(
        (m) => m.FeatureUserModule
      ),
    canActivate: [AuthGuard], // Apenas para usuários logados
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/user/feature-user.module').then(
        (m) => m.FeatureUserModule
      ),
    canActivate: [GuestGuard], // Apenas para usuários não logados
  },
  {
    path: 'registry',
    loadChildren: () =>
      import('./features/user/feature-user.module').then(
        (m) => m.FeatureUserModule
      ),
    canActivate: [GuestGuard], // Apenas para usuários não logados
  }, */
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
