import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: Record<string, number>;
  areasResults: any[] = [];
  result: any;

  constructor(private quizService: QuizService) {}

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
