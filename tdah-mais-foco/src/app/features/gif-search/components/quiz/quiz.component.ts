import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { Subscription } from 'rxjs';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, FormsModule, TranslocoModule],
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any = [];
  results: any = null;
  languageSubscription: Subscription;

  constructor(
    private quizService: QuizService,
    private languageService: LanguageService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.loadQuestions(environment.lang);

    this.languageSubscription = this.languageService.language$.subscribe(() => {
      const language = this.translocoService.getActiveLang();
      this.loadQuestions(language);
    });
  }

  async loadQuestions(language: string) {
    this.questions = await this.quizService.getQuizQuestions(language);
  }

  submitQuiz() {
    this.results = this.quizService.calculateResults(this.questions);
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
