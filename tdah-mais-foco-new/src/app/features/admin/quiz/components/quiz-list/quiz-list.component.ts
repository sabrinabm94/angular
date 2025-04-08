import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContainerComponent } from '../../../../../shared/components/container/container.component';
import { ManageListComponent } from '../../../../../shared/components/manage-list-component/manage-list.component';
import { AlertMessageComponent } from '../../../../../shared/components/alert-message/alert-message.component';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { FirebaseUser } from '../../../../../data/models/user/Firebase-user.interface';
import { Occupation } from '../../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../../data/models/enums/user/user-gender.enum';
import { EducationLevel } from '../../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../../data/models/enums/user/user-role.enum';
import { UserService } from '../../../../../core/services/user.service';
import { TranslateService } from '../../../../../core/services/translate.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { Quiz } from '../../../../../data/models/quiz/quiz.interface';
import { QuizService } from '../../../../../core/services/quiz.service';
import { QuizToManageListItem } from '../../../../../data/models/quiz/quiz-to-manage-list-item.interface';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
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
export class QuizListComponent implements OnInit {
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

  quizToManageList: QuizToManageListItem[] | null = [];

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();

    if (this.userAdmin) {
      await this.getList(this.userAdmin);
    }
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private async getList(
    userAdmin: FirebaseUser | null
  ): Promise<QuizToManageListItem[] | null> {
    if (userAdmin) {
      try {
        let quizToManageList = await this.quizService.getAll(userAdmin);

        if (
          quizToManageList &&
          typeof quizToManageList === 'object' &&
          !Array.isArray(quizToManageList)
        ) {
          quizToManageList = Object.values(quizToManageList);
        }

        if (quizToManageList) {
          console.log('quizToManageList ', quizToManageList);
          this.quizToManageList = quizToManageList.map((item) => ({
            id: item.id ? item.id : '',
            name: item.name ? item.name : '',
            active: item.active ? item.active : false,
            questionQuantity: item.questions ? item.questions.length : 0,
          }));

          return this.quizToManageList;
        }
      } catch (error) {
        const errorMessage = this.translateService.translate('quiz_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          false
        );
      }
    }
    return null;
  }

  public async edit(quiz: Quiz): Promise<boolean | null> {
    const quizId = quiz.id;

    if (quiz) {
      return this.router.navigate([`/quiz-management/${quizId}`]);
    }
    return null;
  }

  public async register(): Promise<boolean | null> {
    return this.router.navigate([`/quiz-register`]);
  }
}
