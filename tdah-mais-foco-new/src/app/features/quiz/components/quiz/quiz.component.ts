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
import { FloorPipe } from '../../../../core/pipes/floor.pipe';

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
    FloorPipe,
  ],
  providers: [LanguageService],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questions: any = [];
  score: Record<string, number> = {};
  submitted: boolean = false;
  currentStep: number = 0; // Etapa atual
  maxSteps: number = 3;
  responses: Record<number, any> = {}; // Armazena respostas por etapa

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

  // Verifica se todas as perguntas da etapa atual foram respondidas
  isFormValid(): boolean {
    const currentQuestions = this.getQuestionsForStep();
    const isValid = currentQuestions.every(
      (question: { response: null }) => question.response !== null
    );
    return isValid;
  }

  // Avança para a próxima etapa
  nextStep() {
    if (this.isFormValid() && this.currentStep < this.maxSteps) {
      this.currentStep++;
    }
  }

  // Volta para a etapa anterior
  backStep() {
    this.currentStep--;
  }

  // Retorna as perguntas da etapa atual
  getQuestionsForStep() {
    const stepSize = Math.ceil(this.questions.length / this.maxSteps); // 3 perguntas por etapa (ajustar conforme necessário)
    const startIndex = this.currentStep * stepSize;
    return this.questions.slice(startIndex, startIndex + stepSize);
  }

  // Verifica se uma pergunta é obrigatória
  checkRequired(question: any) {
    return question.response !== null;
  }
}
