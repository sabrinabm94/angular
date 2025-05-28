import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { GuestGuard } from 'src/app/core/guards/guest.guard';
import { FirebaseModule } from 'src/app/firebase.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('../quiz/feature-quiz.module').then((m) => m.FeatureQuizModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    FirebaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FeatureUserRoutingModule {}
