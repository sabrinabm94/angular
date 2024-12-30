import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { QuizData } from '../../../../data/models/quizData.interface';

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
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questions: any = [];
  score: QuizData | null = null;
  submitted: boolean = false;
  currentStep: number = 0;
  maxSteps: number = 3;
  responses: Record<number, any> = {};
  loggedUser: FirebaseUser | null = null;

  @Input() userId: string | null = '';
  @Input() languageName: string = '';

  @Output() results = new EventEmitter<QuizData | null>();

  constructor(
    private router: Router,
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;

    if (this.languageName) {
      // Carrega as perguntas iniciais
      this.loadQuizQuestions(this.languageName);
    }

    // Observa mudanças de idioma
    this.translateService
      .getLanguageChanged()
      .subscribe((currentLanguage: string) => {
        this.languageName = currentLanguage;
        this.loadQuizQuestions(this.languageName);
      });
  }

  // Carregar as perguntas com base na linguagem
  private async loadQuizQuestions(language: string) {
    this.quizService
      .getQuizQuestions(language)
      .then((questions: any[]) => {
        this.questions = questions;
      })
      .catch((error) => {
        console.error('Erro ao carregar perguntas:', error);
      });
  }

  // Submeter o quiz e salvar a pontuação no banco
  public async submitQuizAwsers() {
    if (this.isFormValid()) {
      this.submitted = true;
      this.calculateQuizScore(this.questions);
    } else {
      this.submitted = false;
    }
  }

  private async calculateQuizScore(questions: any[]): Promise<QuizData | null> {
    if (questions) {
      try {
        this.score = await this.quizService.calculateResultsScoreByArea(
          questions
        );
        if (this.userId) {
          await this.saveUserScore(this.score).then((response) => {
            this.router.navigate([`/result/${this.userId}`]);
          });
        } else {
          this.results.emit(this.score);
        }

        return this.score;
      } catch (error) {
        console.error('Erro ao calcular ou salvar pontuação:', error);
        throw error;
      }
    }
    return null;
  }

  // Verifica se todas as perguntas da etapa atual foram respondidas
  public isFormValid(): boolean {
    const currentQuestions = this.getQuestionsForStep();
    return currentQuestions.every(
      (question: any) =>
        question.response !== null && question.response !== undefined
    );
  }

  // Avança para a próxima etapa
  public nextStep() {
    if (this.isFormValid() && this.currentStep < this.maxSteps) {
      this.currentStep++;
    }
  }

  // Volta para a etapa anterior
  public backStep() {
    this.currentStep--;
  }

  // Retorna as perguntas da etapa atual
  public getQuestionsForStep() {
    const stepSize = Math.ceil(this.questions.length / this.maxSteps);
    const startIndex = this.currentStep * stepSize;
    return this.questions.slice(startIndex, startIndex + stepSize);
  }

  // Verifica se uma pergunta é obrigatória
  public checkRequired(question: any) {
    return question.response !== null;
  }

  private async saveUserScore(
    score: QuizData | null
  ): Promise<QuizData | null> {
    if (score) {
      try {
        const result = await this.userService.saveUserScore(score);
        return result;
      } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
        throw error;
      }
    } else {
      console.error('Pontuação inválida.');
      throw new Error('Pontuação inválida');
    }
  }
}
