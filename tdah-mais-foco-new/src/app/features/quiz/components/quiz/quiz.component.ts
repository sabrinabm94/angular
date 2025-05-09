import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../../core/services/quiz.service';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/user/Firebase-user.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizResult } from '../../../../data/models/quiz/quiz-result.interface';
import { AlertService } from '../../../../core/services/alert.service';
import { Occupation } from '../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../data/models/enums/user/user-gender.enum';
import { EducationLevel } from '../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../data/models/enums/user/user-role.enum';
import { QuestionService } from '../../../../core/services/question.service';
import { Quiz } from '../../../../data/models/quiz/quiz.interface';
import { Language } from '../../../../data/models/language.interface';
import { QuizQuestion } from '../../../../data/models/quiz/quiz-question.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ContainerComponent],
})
export class QuizComponent {
  public questions: QuizQuestion[] | null = [];
  public quizId: string | null = '';
  public quizToManage: Quiz = {
    id: '',
    name: '',
    questions: [],
    active: false,
  };

  submitted: boolean = false;
  currentStep: number = 0;
  maxSteps: number = 9;
  responses: Record<number, any> = {};
  loggedUser: FirebaseUser | null = null;

  userAdmin: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '2000-01-01',
    ocupation: Occupation.student,
    gender: Gender.male,
    educationLevel: EducationLevel.high_school,
    role: Role.user,
    active: true,
    creationDate: '',
    updateDate: null,
    creatorId: '',
    updaterId: null,
  };

  @Input() score: QuizResult | null = null;
  @Input() userId: string | null = '';
  @Input() isFirstScore: boolean = false;
  @Input() currentLanguageId: number | null = null;
  @Output() results = new EventEmitter<QuizResult | null>();

  constructor(
    private router: Router,
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.submitted = false;

    this.getUser().then(() => {
      this.getQuizToManageById().then(() => {
        if (this.currentLanguageId) {
          this.getQuestions(this.currentLanguageId);
        }
      });
    });

    this.translateService.onLanguageChange((language: Language) => {
      this.currentLanguageId = language?.id ?? 0;
      if (this.currentLanguageId) {
        this.getQuestions(this.currentLanguageId);
      }
    });
  }

  private getIdFromUrl() {
    return this.route.snapshot.paramMap.get('id');
  }

  public async getQuizById(
    id: string,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    try {
      const data: Quiz | null = await this.quizService
        .getById(id, userAdmin)
        .then((result) => result);

      if (data) {
        return data;
      }
    } catch (error) {
      const errorMessage = this.translateService.translate('quiz_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  private async getQuizToManageById(): Promise<Quiz | null> {
    const id = this.getIdFromUrl();

    if (id && this.userAdmin) {
      const data = await this.getQuizById(id, this.userAdmin);

      if (data) {
        this.quizToManage = data;
        this.quizId = data.id ? data.id : null;

        return this.quizToManage;
      }
    }

    return null;
  }

  private async getQuestions(languageId: number) {
    if (this.quizId && languageId) {
      await this.getAllByQuizId(this.quizId, this.userAdmin, languageId);
    }
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private async getAllByQuizId(
    quizId: string,
    userAdmin: FirebaseUser | null,
    languageId: number
  ): Promise<QuizQuestion[] | null> {
    if (quizId && userAdmin && languageId) {
      try {
        const questions = await this.questionService.getAllByQuizId(
          quizId,
          userAdmin
        );
        if (questions) {
          // Filtrando valores nulos e garantindo que questions seja do tipo QuizQuestionToManageListItem[]
          const activeLanguage: Language | null =
            this.translateService.getLanguageById(languageId);

          if (activeLanguage && activeLanguage.initials) {
            const translatedQuestions = await Promise.all(
              questions.map((question) =>
                this.questionService
                  .getQuestionByLanguageId(question, activeLanguage.id)
                  .then((q) => q ?? question)
              )
            );
            this.questions = translatedQuestions;
          }

          return this.questions;
        }
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'questions_data_error'
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

  public async submitAnswers() {
    if (this.isFormValid() && this.questions) {
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
    /* const currentQuestions = this.getQuestionsForStep();
    if (currentQuestions) {
      return currentQuestions.every(
        (question: any) =>
          question.response !== null && question.response !== undefined
      );
    }
      */
    return false;
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
    const questions = this.questions;
    console.log('questions ', questions);

    /* if (this.questions) {
      const stepSize = Math.ceil(this.questions.length / this.maxSteps);
      const startIndex = this.currentStep * stepSize;
      return this.questions.slice(startIndex, startIndex + stepSize);
    } */
    return [];
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
