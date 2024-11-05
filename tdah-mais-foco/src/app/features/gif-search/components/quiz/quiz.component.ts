import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { Subscription } from 'rxjs';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from 'src/app/shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
  ],
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any = [];
  score: Record<string, number> = {};
  languageSubscription: Subscription;
  submitted: boolean = false;

  @Output() results = new EventEmitter<Record<string, number>>();

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
    this.submitted = false;
    this.questions = await this.quizService.getQuizQuestions(language);
  }

  submitQuiz() {
    if (this.isFormValid()) {
      this.submitted = true;
      this.score = this.quizService.calculateQuestionsScore(this.questions);
      this.results.emit(this.score);
    } else {
      this.submitted = false;
    }
  }

  isFormValid(): boolean {
    return this.questions.every((question) => question.response !== null);
  }

  checkRequired(question: any) {
    return question.response !== null;
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
