import { Component, Input } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../../../../core/transloco/transloco-root.module';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    TranslocoModule,
    TranslocoRootModule,
    ContainerComponent,
    CommonModule,
  ],
  providers: [TranslocoService, LanguageService],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: any;
  areasResults: any[] = [];
  result: any;

  constructor(
    private quizService: QuizService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.generateResults();
  }

  async generateResults() {
    try {
      const messagesByArea = await this.quizService.getResultsMessageByArea();
      this.areasResults = this.quizService.calculateResultsByArea(
        this.score,
        messagesByArea
      );

      const messages = await this.quizService.getResultsMessage();
      this.result = this.quizService.calculateResults(this.score, messages);
    } catch (error) {
      console.error('Error generating results:', error);
    }
  }
}
