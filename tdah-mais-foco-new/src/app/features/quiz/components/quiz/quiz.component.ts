import { Component, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../core/services/translate.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ContainerComponent,
    FieldsetComponent,
    ButtonComponent,
    ErrorMessageComponent,
    TranslatePipe,
  ],
  providers: [LanguageService],
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
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const language = this.languageService.getLanguage();
    this.loadQuestions(language);

    // Inscrever-se para as mudanças de idioma
    this.translateService.getLanguageChanged().subscribe((language) => {
      this.loadQuestions(language); // Recarrega as perguntas com o novo idioma
    });
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
    return this.questions.every(
      (question: { response: null }) => question.response !== null
    );
  }

  // Verifica se uma pergunta é obrigatória
  checkRequired(question: any) {
    return question.response !== null;
  }
}
