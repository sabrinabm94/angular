import { NgModule } from '@angular/core';
import { ResultsModule } from './components/results/results.module';
import { QuizModule } from './components/quiz/quiz.module';

@NgModule({
  providers: [],
  imports: [QuizModule, ResultsModule],
  declarations: [],
  exports: [QuizModule, ResultsModule],
})
export class FeatureQuizModule {}
