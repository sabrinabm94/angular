// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/quiz/feature-quiz-routing.module').then(
        (m) => m.routes
      ),
  },
  { path: '**', redirectTo: '' },
];
