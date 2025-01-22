import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../../core/services/quiz.service';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
import { ResultQuizData } from '../../../../data/models/result-quiz-data.interface';
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
  score: ResultQuizData | null = null;
  submitted: boolean = false;
  currentStep: number = 0;
  maxSteps: number = 9;
  responses: Record<number, any> = {};
  loggedUser: FirebaseUser | null = null;

  @Input() userId: string | null = '';
  @Input() isFirstScore: boolean = false;
  @Input() languageName: string = '';
  @Output() results = new EventEmitter<ResultQuizData | null>();

  constructor(
    private router: Router,
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;

    if (this.languageName) {
      this.getQuestions(this.languageName);
    }

    this.translateService
      .getLanguageChanged()
      .subscribe((currentLanguage: string) => {
        this.languageName = currentLanguage;
        this.getQuestions(this.languageName);
      });
  }

  private async getQuestions(language: string) {
    this.quizService
      .getQuizQuestions(language)
      .then((questions: any[]) => {
        this.questions = questions;
      })
      .catch((error) => {
        console.error('Erro ao carregar perguntas:', error);
      });
  }

  public async submitAnswers() {
    if (this.isFormValid()) {
      this.submitted = true;
      this.calculateScore(this.questions);
    } else {
      this.submitted = false;
    }
  }

  private async calculateScore(
    questions: any[]
  ): Promise<ResultQuizData | null> {
    if (questions) {
      const databasePath = '/result/';
      if (databasePath) {
        try {
          this.score = await this.quizService.calculateResultsScoreByArea(
            questions,
            this.isFirstScore
          );
          if (this.userId) {
            await this.saveScore(this.score).then((response) => {
              if (response) {
                this.router.navigate([`${databasePath}${this.userId}`]);
              }
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
      this.scrollPageToTop();
    }
  }

  public backStep() {
    this.currentStep--;
    this.scrollPageToTop();
  }

  public getQuestionsForStep() {
    const stepSize = Math.ceil(this.questions.length / this.maxSteps);
    const startIndex = this.currentStep * stepSize;
    return this.questions.slice(startIndex, startIndex + stepSize);
  }

  public checkAnswer(question: any) {
    return question.response !== null;
  }

  private scrollPageToTop() {
    setTimeout(() => {
      const quizContainer = document.querySelector('.quiz');
      if (quizContainer) {
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  private async saveScore(
    score: ResultQuizData | null
  ): Promise<ResultQuizData | null> {
    if (score) {
      try {
        return await this.userService.saveUserScore(score);
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
