import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/quiz/quiz.module').then((m) => m.QuizModule),
  },
];
