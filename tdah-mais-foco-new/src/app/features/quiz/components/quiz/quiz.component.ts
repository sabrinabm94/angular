import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../../core/services/quiz.service';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/user/Firebase-user.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { AlertMessageComponent } from '../../../../shared/components/alert-message/alert-message.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizResult } from '../../../../data/models/quiz/quiz-result.interface';
import { QuizResultByArea } from '../../../../data/models/quiz/quiz-result-by-area.interface';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TranslatePipe,
    AlertMessageComponent,
    FormsModule,
    FieldsetComponent,
    ContainerComponent,
  ],
})
export class QuizComponent {
  questions: any = [];
  @Input() score: QuizResult | null = null;
  submitted: boolean = false;
  currentStep: number = 0;
  maxSteps: number = 9;
  responses: Record<number, any> = {};
  loggedUser: FirebaseUser | null = null;

  @Input() userId: string | null = '';
  @Input() isFirstScore: boolean = false;
  @Input() languageName: string = '';
  @Output() results = new EventEmitter<QuizResult | null>();

  constructor(
    private router: Router,
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService,
    private alertService: AlertService
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
        const errorMessage = this.translateService.translate(
          'questions_data_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
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

  private async calculateScore(questions: any[]): Promise<QuizResult | null> {
    if (questions) {
      const databasePath = '/result/';
      if (databasePath) {
        try {
          this.score = await this.quizService.calculateResultsScoreByArea(
            questions,
            this.isFirstScore
          );
          if (this.userId) {
            await this.saveScore(this.score).then((result) => {
              if (result) {
                this.router.navigate([`${databasePath}${this.userId}`]);
              }
            });
          } else {
            this.results.emit(this.score);
          }
          return this.score;
        } catch (error) {
          const errorMessage = this.translateService.translate(
            'quiz_results_processing_error'
          );
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'error',
            true
          );
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
    score: QuizResult | null
  ): Promise<QuizResult | null> {
    if (score) {
      try {
        return await this.userService.saveUserScore(score);
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'quiz_results_save_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    return null;
  }
}
