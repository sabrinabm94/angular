import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../../core/services/quiz.service';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { QuizData } from '../../../../data/models/quizData.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TranslatePipe,
    ErrorMessageComponent,
    FormsModule,
    FieldsetComponent,
    ContainerComponent,
  ],
})
export class QuizComponent {
  questions: any = [];
  score: QuizData | null = null;
  submitted: boolean = false;
  currentStep: number = 0;
  maxSteps: number = 10;
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
      this.loadQuizQuestions(this.languageName);
    }

    this.translateService
      .getLanguageChanged()
      .subscribe((currentLanguage: string) => {
        this.languageName = currentLanguage;
        this.loadQuizQuestions(this.languageName);
      });
  }

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

  public isFormValid(): boolean {
    const currentQuestions = this.getQuestionsForStep();
    return currentQuestions.every(
      (question: any) =>
        question.response !== null && question.response !== undefined
    );
  }

  public nextStep() {
    if (this.isFormValid() && this.currentStep < this.maxSteps) {
      this.currentStep++;
      this.scrollToTop(); // Rola para o topo após avançar
    }
  }

  public backStep() {
    this.currentStep--;
    this.scrollToTop(); // Rola para o topo ao voltar
  }

  public getQuestionsForStep() {
    const stepSize = Math.ceil(this.questions.length / this.maxSteps);
    const startIndex = this.currentStep * stepSize;
    return this.questions.slice(startIndex, startIndex + stepSize);
  }

  public checkRequired(question: any) {
    return question.response !== null;
  }

  private scrollToTop() {
    setTimeout(() => {
      const quizContainer = document.querySelector('.quiz');
      if (quizContainer) {
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
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
