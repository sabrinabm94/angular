import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizService } from 'src/app/core/services/quiz.service';

@NgModule({
  providers: [QuizService],
  imports: [
    CommonModule,
    TranslocoModule,
    QuizRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
  declarations: [],
  exports: [],
})
export class QuizModule {}
