import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../../shared/components/fieldset/fieldset.component';
import { AlertMessageComponent } from '../../../../../shared/components/alert-message/alert-message.component';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { TranslateOrReturnKeyPipe } from '../../../../../core/pipes/translateOrReturnKey.pipe';
import { Quiz } from '../../../../../data/models/quiz/quiz.interface';
import { DateUtils } from '../../../../../core/utils/date.utils';
import { TranslateService } from '../../../../../core/services/translate.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { QuizService } from '../../../../../core/services/quiz.service';
import { FirebaseUser } from '../../../../../data/models/user/Firebase-user.interface';
import { EducationLevel } from '../../../../../data/models/enums/user/user-educationLevel.enum';
import { Occupation } from '../../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../../data/models/enums/user/user-gender.enum';
import { Role } from '../../../../../data/models/enums/user/user-role.enum';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-quiz-manage',
  standalone: true,
  templateUrl: './quiz-manage.component.html',
  styleUrls: ['./quiz-manage.component.css'],
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
    MatOptionModule,
  ],
})
export class QuizManageComponent implements OnInit {
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

  public quizToManage: Quiz = {
    name: '',
    questions: [],
    active: false,
  };

  constructor(
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private quizService: QuizService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getQuizToManageById();
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private getIdFromUrl() {
    return this.route.snapshot.paramMap.get('id') || null;
  }

  private async getQuizToManageById(): Promise<Quiz | null> {
    const quizToManageId = this.getIdFromUrl();

    if (quizToManageId) {
      const quizToManage = await this.getById(quizToManageId);

      return quizToManage ? (this.quizToManage = quizToManage) : null;
    }

    return null;
  }

  private async getById(id: string): Promise<Quiz | null> {
    if (id && this.userAdmin) {
      try {
        const quizData: Quiz | null = await this.quizService
          .getById(id, this.userAdmin)
          .then((result) => result);

        if (quizData) {
          const errorMessage =
            this.translateService.translate('quiz_data_success');
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'success',
            false
          );

          return quizData;
        }
      } catch (error) {
        const errorMessage = this.translateService.translate('quiz_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    return null;
  }

  private createObject(userAdminId: string, quizToManage: Quiz) {
    const newData: Quiz = {
      id: quizToManage.id ? quizToManage.id : String(crypto.randomUUID()),
      name: String(quizToManage.name),
      questions: [],
      active: quizToManage.active,
      updateDate: this.dateUtils.formateDateToInternationFormatString(
        new Date()
      ),
      updaterId: String(userAdminId),
    };

    return newData;
  }

  public async update(
    quizToManage: Quiz | null,
    userAdminId: string | null
  ): Promise<void> {
    this.submitted = true;
    if (quizToManage && this.isFormValid(quizToManage) && userAdminId) {
      const newData = this.createObject(userAdminId, quizToManage);

      if (newData && this.userAdmin) {
        await this.quizService
          .update(newData, this.userAdmin)
          .then(async (result) => {
            if (result) {
              const errorMessage = this.translateService.translate(
                'quiz_update_success'
              );
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'success',
                true
              );
              this.router.navigate([`/quiz-list`]);
            }
          })
          .catch((error) => {
            if (error) {
              const errorMessage =
                this.translateService.translate('quiz_update_error');
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'error',
                true
              );
            }
          });
      }
    }
  }

  public async delete(
    quizToManage: Quiz | null,
    userAdminId: string | null
  ): Promise<FirebaseUser | null> {
    if (quizToManage && userAdminId) {
      this.submitted = true;
      if (userAdminId && quizToManage) {
        let newData = this.createObject(userAdminId, quizToManage);
        newData.active = false;

        if (newData && this.userAdmin) {
          await this.quizService
            .update(newData, this.userAdmin)
            .then(async (result) => {
              if (result) {
                const errorMessage = this.translateService.translate(
                  'quiz_update_success'
                );
                this.alertService.alertMessageTriggerFunction(
                  errorMessage,
                  'success',
                  true
                );
                this.router.navigate([`/quiz-list`]);
              }
              return null;
            })
            .catch((error) => {
              const errorMessage =
                this.translateService.translate('quiz_update_error');
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'error',
                true
              );
            });
        }
      }
    }
    return null;
  }

  public async editQuestions(
    quizId: string | undefined
  ): Promise<boolean | null> {
    if (quizId) {
      return this.router.navigate([`/question-list/${quizId}`]);
    }
    return null;
  }

  public isFormValid(formData: any): boolean {
    if (formData) {
      const isNameValid =
        formData.name && formData.name.trim() !== ' ' ? true : false;
      return isNameValid;
    }
    return false;
  }
}
