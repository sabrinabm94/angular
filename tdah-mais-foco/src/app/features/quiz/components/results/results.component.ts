import { Component, Input } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { QuizService } from 'src/app/core/services/quiz.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [SharedModule, TranslocoModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: Record<string, number>;
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
