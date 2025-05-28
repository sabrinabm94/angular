import { Component, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FieldsetComponent } from 'src/app/shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
    ContainerComponent,
    TranslocoModule,
  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questions: any = [];
  score: Record<string, number> = {};
  submitted: boolean = false;

  @Output() results = new EventEmitter<Record<string, number>>();

  constructor(
    private quizService: QuizService,
    private languageService: LanguageService,
    private translocoService: TranslocoService
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    const language = this.languageService.getLanguage();
    this.loadQuestions(language);
  }

  // Método para carregar as perguntas com base na linguagem atual
  async loadQuestions(language: string) {
    this.submitted = false;
    this.questions = await this.quizService.getQuizQuestions(language);
  }

  // Método para enviar o quiz e calcular a pontuação
  submitQuiz() {
    if (this.isFormValid()) {
      this.submitted = true;
      this.score = this.quizService.calculateQuestionsScore(this.questions);
      this.results.emit(this.score);
    } else {
      this.submitted = false;
    }
  }

  // Verifica se todas as perguntas foram respondidas
  isFormValid(): boolean {
    return this.questions.every((question) => question.response !== null);
  }

  // Verifica se uma pergunta é obrigatória
  checkRequired(question: any) {
    return question.response !== null;
  }
}
