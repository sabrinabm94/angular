import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';
import { QuizService } from 'src/app/core/services/quiz.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  providers: [QuizService, RouterModule],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule,
    HomePageComponent,
    NotFoundPageComponent,
    ResultsComponent,
    QuizComponent,
  ],
  exports: [
    HomePageComponent,
    NotFoundPageComponent,
    ResultsComponent,
    QuizComponent,
  ]
})
export class QuizModule { }
