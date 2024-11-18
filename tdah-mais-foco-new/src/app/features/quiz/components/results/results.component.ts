import { Component, Input } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ContainerComponent, CommonModule, TranslatePipe],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: any;
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
