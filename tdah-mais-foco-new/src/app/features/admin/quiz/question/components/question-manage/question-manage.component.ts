import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../../../core/services/translate.service';
import { DateUtils } from '../../../../../../core/utils/date.utils';
import { FirebaseUser } from '../../../../../../data/models/user/Firebase-user.interface';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { FieldsetComponent } from '../../../../../../shared/components/fieldset/fieldset.component';
import { AlertService } from '../../../../../../core/services/alert.service';
import { TranslateOrReturnKeyPipe } from '../../../../../../core/pipes/translateOrReturnKey.pipe';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';
import { QuestionArea } from '../../../../../../data/models/enums/question/question-area.enum';
import { QuestionService } from '../../../../../../core/services/question.service';
import { Quiz } from '../../../../../../data/models/quiz/quiz.interface';
import { QuizService } from '../../../../../../core/services/quiz.service';
import { Language } from '../../../../../../data/models/language.interface';
import { Occupation } from '../../../../../../data/models/enums/user/user-occupation.enum';
import { EducationLevel } from '../../../../../../data/models/enums/user/user-educationLevel.enum';
import { Gender } from '../../../../../../data/models/enums/user/user-gender.enum';
import { Role } from '../../../../../../data/models/enums/user/user-role.enum';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-question-manage',
  standalone: true,
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    TranslatePipe,
    TranslateOrReturnKeyPipe,
    MatOptionModule,
  ],
})
export class QuestionManageComponent implements OnInit {
  @Input()
  userAdminId: string | null = null;

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

  public submitted: boolean = false;
  public questionAreaOptions: QuestionArea[] = [];
  public quizList: Quiz[] = [];

  public questionToManage: QuizQuestion = {
    questions: [],
    area: [],
    active: false,
  };

  public quizId: string = '';

  public quizToManage: Quiz = {
    name: '',
    questions: [],
    active: false,
  };

  public languages: Language[] = [];

  constructor(
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private questionService: QuestionService,
    private quizService: QuizService,
    private userService: UserService,
    private router: Router
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getQuizToManageById(),
      this.getQuestionToManageById(),
    ]);
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private getFormOptions() {
    this.questionAreaOptions = Object.values(QuestionArea);
    this.languages = this.translateService.getLanguagesList();
  }

  private getQuizIdFromUrl() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    return quizId ? (this.quizId = quizId) : null;
  }

  private getQuestionIdFromUrl() {
    const questionId = this.route.snapshot.paramMap.get('questionId');
    return questionId ? questionId : null;
  }

  private async getQuizToManageById(): Promise<Quiz | null> {
    const user = await this.getUser().then((result) => result);
    const quizId = this.getQuizIdFromUrl();

    if (quizId && user) {
      return this.getQuizById(quizId, user);
    }
    return null;
  }

  private async getQuestionToManageById(): Promise<QuizQuestion | null> {
    const user = await this.getUser().then((result) => result);
    const quizId = this.getQuizIdFromUrl();
    const questionId = this.getQuestionIdFromUrl();

    if (quizId && questionId && user) {
      const data = await this.getQuestionById(quizId, questionId, user);
      if (data) {
        this.questionToManage = data;
        return data;
      }
    }

    return null;
  }

  public async getQuizById(
    id: string,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    try {
      const data: Quiz | null = await this.quizService.getById(id, userAdmin);
      return data ?? null;
    } catch (error) {
      const errorMessage = this.translateService.translate('quiz_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
      return null;
    }
  }

  public async getQuestionById(
    quizId: string,
    questionId: string,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion | null> {
    try {
      const data: QuizQuestion | null = await this.questionService.getOneById(
        quizId,
        questionId,
        userAdmin
      );
      if (data) {
        return data;
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

    return null;
  }

  public createQuestionObject(
    userAdminId: string,
    questionToManage: QuizQuestion
  ) {
    const questionToManageNewData: QuizQuestion = {
      id: questionToManage.id,
      questions: questionToManage.questions
        ? questionToManage.questions.map((question) => ({
            ...question,
            language: this.getLanguageById(question.language),
          }))
        : [],
      area: questionToManage.area,
      active: questionToManage.active,
      updateDate: this.dateUtils.formateDateToInternationFormatString(
        new Date()
      ),
      updaterId: String(userAdminId),
    };

    return questionToManageNewData;
  }

  public async update(
    questionToManage: QuizQuestion | null,
    userAdminId: string | null
  ): Promise<FirebaseUser | null> {
    const quizId: string | null = this.getQuizIdFromUrl();

    if (quizId && this.userAdmin) {
      const quiz: Quiz | null = await this.quizService.getById(
        quizId,
        this.userAdmin
      );

      if (quiz && questionToManage && questionToManage.id) {
        const questionsNumber: number = quiz.questions.length;

        if (userAdminId && questionToManage) {
          const questionNewData = this.createQuestionObject(
            userAdminId,
            questionToManage
          );

          if (questionsNumber > 0) {
            const index = quiz.questions.findIndex(
              (question) => question.id === questionNewData.id
            );

            if (index !== -1) {
              quiz.questions[index] = {
                ...quiz.questions[index],
                ...questionNewData,
              };
            } else {
              quiz.questions.push(questionNewData);
            }
          }

          if (questionNewData) {
            this.updateQuiz(quiz, userAdminId, quiz.questions);
          }
        }
      }
    }

    return null;
  }

  public async delete(
    questionToManage: QuizQuestion | null,
    userAdminId: string | null
  ): Promise<FirebaseUser | null> {
    this.submitted = true;
    if (userAdminId && questionToManage) {
      let questionNewData = questionToManage;
      questionNewData.active = false;

      const index = this.quizToManage.questions.findIndex(
        (question) => question.id === questionNewData.id
      );

      if (index !== -1) {
        this.quizToManage.questions[index] = {
          ...this.quizToManage.questions[index],
          ...questionNewData,
        };
      }

      if (questionNewData) {
        this.updateQuiz(
          this.quizToManage,
          userAdminId,
          this.quizToManage.questions
        );
      }
    }
    return null;
  }

  private createQuizObject(
    userAdminId: string,
    quizToManage: Quiz,
    questions: QuizQuestion[]
  ) {
    const quizToManageNewData: Quiz = {
      id: quizToManage.id ? quizToManage.id : String(crypto.randomUUID()),
      name: String(quizToManage.name),
      questions: questions,
      active: quizToManage.active,
      updateDate: this.dateUtils.formateDateToInternationFormatString(
        new Date()
      ),
      updaterId: String(userAdminId),
    };

    return quizToManageNewData;
  }

  public async updateQuiz(
    quiz: Quiz | null,
    userAdminId: string | null,
    questions: QuizQuestion[]
  ): Promise<void> {
    this.submitted = true;
    if (quiz && quiz.id && userAdminId && questions && this.userAdmin) {
      const quizId = quiz.id;
      let newData = this.createQuizObject(userAdminId, quiz, questions);
      newData.id = quizId;
      try {
        const result = await this.quizService.update(newData, this.userAdmin);
        if (result) {
          const successMessage = this.translateService.translate(
            'quiz_update_success'
          );
          this.alertService.alertMessageTriggerFunction(
            successMessage,
            'success',
            true
          );
          this.router.navigate([`/question-list/${quizId}`]);
        }
      } catch (error) {
        const errorMessage =
          this.translateService.translate('quiz_update_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
  }

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public onSelectionChange(event: Event, selectedArea: QuestionArea): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const defaultValue = 'none';

    if (isChecked) {
      // Remover o valor "none" caso esteja presente
      this.questionToManage.area = this.questionToManage.area.filter(
        (area) => area !== defaultValue
      );

      // Adicionar o valor selecionado
      this.questionToManage.area = [
        ...this.questionToManage.area,
        selectedArea,
      ];
    } else {
      // Remover o valor desmarcado
      this.questionToManage.area = this.questionToManage.area.filter(
        (area) => area !== selectedArea
      );
    }
  }

  addQuestion() {
    const questions = this.questionToManage.questions;
    const question = {
      question: '',
      language: {
        name: '',
        initials: '',
        id: 0,
      },
      example: '',
      frequency: '',
      context: '',
    };

    questions.push(question);

    this.questionToManage.questions = questions;
  }

  removeQuestion(index: number) {
    this.questionToManage.questions.splice(index, 1);
  }

  public isFormAreaSelectedValid(): boolean {
    // Verifica se ao menos uma área foi selecionada
    const isAreaSelected =
      this.questionToManage.area.length > 0 &&
      !this.questionToManage.area.includes(QuestionArea.none);

    return isAreaSelected;
  }

  public isFormValid(): boolean {
    // Verifica se todas as perguntas possuem os campos obrigatórios preenchidos
    const areAllQuestionsValid = this.questionToManage.questions.every(
      (question) =>
        question.language !== null &&
        question.question.trim() !== '' &&
        question.frequency.trim() !== '' &&
        question.context.trim() !== '' &&
        question.example.trim() !== ''
    );

    return areAllQuestionsValid;
  }

  private getLanguageById(language: Language): Language {
    if (language) {
      const languageFound = this.translateService.getLanguageById(language);
      return languageFound;
    }
    return language;
  }
}
