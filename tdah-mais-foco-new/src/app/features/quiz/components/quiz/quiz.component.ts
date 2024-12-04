import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';

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
  currentStep: number = 0;
  maxSteps: number = 3;
  responses: Record<number, any> = {};
  loggedUser: FirebaseUser | null = null;

  @Output() results = new EventEmitter<Record<string, number>>();
  @Input() userId: string = '';
  @Input() language: string = '';

  constructor(
    private router: Router,
    private quizService: QuizService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;

    if (this.language) {
      // Carrega perguntas
      this.loadQuizQuestions(this.language);
    }

    // Observa mudanças de idioma
    this.translateService
      .getLanguageChanged()
      .subscribe((currentLanguage: string) => {
        this.language = currentLanguage;
        this.loadQuizQuestions(this.language);
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

  private async calculateQuizScore(questions: any[]): Promise<any> {
    if (questions) {
      try {
        const result = await this.quizService.calculateResultsScoreByArea(
          questions
        );
        this.score = result;

        if (this.userId) {
          await this.saveUserScore(this.userId, this.score).then((response) => {
            this.router.navigate([`/result/${this.userId}`]);
          });
        } else {
          this.results.emit({ ...this.score });
        }

        return this.score;
      } catch (error) {
        console.error('Erro ao calcular ou salvar pontuação:', error);
        throw error;
      }
    }
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
    id: string,
    score: Record<string, number>
  ): Promise<any> {
    if (id) {
      try {
        const result = await this.userService.saveUserScore(id, score);
        return result;
      } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
        throw error;
      }
    } else {
      console.error('Usuário deslogado ou pontuação inválida.');
      throw new Error('Usuário deslogado ou pontuação inválida');
    }
  }
}
