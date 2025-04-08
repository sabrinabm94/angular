import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EducationLevel } from '../../../../../../data/models/enums/user/user-educationLevel.enum';
import { Gender } from '../../../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../../../data/models/enums/user/user-occupation.enum';
import { Role } from '../../../../../../data/models/enums/user/user-role.enum';
import { FirebaseUser } from '../../../../../../data/models/user/Firebase-user.interface';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { ManageListComponent } from '../../../../../../shared/components/manage-list-component/manage-list.component';
import { QuizQuestionToManageListItem } from '../../../../../../data/models/quiz/quiz-question-to-manage-list-item.interface';
import { QuestionService } from '../../../../../../core/services/question.service';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';
import { UserService } from '../../../../../../core/services/user.service';
import { AlertMessageComponent } from '../../../../../../shared/components/alert-message/alert-message.component';
import { TranslateService } from '../../../../../../core/services/translate.service';
import { AlertService } from '../../../../../../core/services/alert.service';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { Quiz } from '../../../../../../data/models/quiz/quiz.interface';
import { QuizService } from '../../../../../../core/services/quiz.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
    ManageListComponent,
    AlertMessageComponent,
    TranslatePipe,
  ],
})
export class QuestionListComponent implements OnInit {
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

  questionsToManageList: QuizQuestionToManageListItem[] | null = [];

  public quizId: string | null = '';

  public quizToManage: Quiz = {
    id: '',
    name: '',
    questions: [],
    active: false,
  };

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private router: Router,
    private translateService: TranslateService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getQuizToManageById();
    await this.getQuestions();
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

  private async getQuestions() {
    if (this.quizId) {
      await this.getAllByQuizId(this.quizId, this.userAdmin);
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
    userAdmin: FirebaseUser | null
  ): Promise<QuizQuestionToManageListItem[] | null> {
    if (quizId && userAdmin) {
      try {
        const questionsToManageList = await this.questionService.getAllByQuizId(
          quizId,
          userAdmin
        );
        if (questionsToManageList) {
          // Filtrando valores nulos e garantindo que questionsToManageList seja do tipo QuizQuestionToManageListItem[]

          this.questionsToManageList = questionsToManageList.map((item) => {
            const activeLanguage = this.translateService.getLanguage();
            const questionByActiveLanguage =
              this.translateService.translateQuestionByLanguage(
                item,
                activeLanguage
              );

            const question = {
              id: item.id ?? '',
              question: questionByActiveLanguage ?? item.questions[0],
              area: item.area ?? [],
              active: item.active ?? false,
            };

            console.log('question ', question);

            return question;
          });

          return this.questionsToManageList;
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

  public async edit(
    quizId: string | null,
    question: QuizQuestion
  ): Promise<boolean | null> {
    const questionId = question.id;

    if (question && questionId) {
      let url = `/question-management/${questionId}`;
      if (quizId) {
        url = `/question-management/${quizId}/${questionId}`;
      }

      console.log('quizId ', quizId);
      console.log('questionId ', questionId);
      console.log('url ', url);
      return this.router.navigate([url]);
    }
    return null;
  }

  public async register(quizId: string | null): Promise<boolean | null> {
    let url = `/question-register`;
    if (quizId) {
      url = `/question-register/${quizId}`;
    }
    return this.router.navigate([url]);
  }
}
