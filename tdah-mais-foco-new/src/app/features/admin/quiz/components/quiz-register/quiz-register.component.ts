import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../../shared/components/fieldset/fieldset.component';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { Quiz } from '../../../../../data/models/quiz/quiz.interface';
import { TranslateService } from '../../../../../core/services/translate.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { DateUtils } from '../../../../../core/utils/date.utils';
import { QuizService } from '../../../../../core/services/quiz.service';
import { TextOnlyDirective } from '../../../../../core/directives/text-only.directive';
import { FirebaseUser } from '../../../../../data/models/user/Firebase-user.interface';
import { UserService } from '../../../../../core/services/user.service';
import { EducationLevel } from '../../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../../data/models/enums/user/user-role.enum';
import { Occupation } from '../../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../../data/models/enums/user/user-gender.enum';

@Component({
  selector: 'app-quiz-register',
  standalone: true,
  templateUrl: './quiz-register.component.html',
  styleUrls: ['./quiz-register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    TranslatePipe,
    RouterModule,
    TextOnlyDirective,
  ],
})
export class QuizRegisterComponent {
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

  public quiz: Quiz = {
    name: '',
    questions: [],
    active: false,
  };

  constructor(
    private translateService: TranslateService,
    private quizService: QuizService,
    private alertService: AlertService,
    private dateUtils: DateUtils,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  public async register(userAdmin: FirebaseUser | null): Promise<void> {
    if (userAdmin) {
      const userAdminId = userAdmin.uid;

      this.submitted = true;
      const formData = this.quiz;

      if (this.isFormValid(formData) && formData) {
        const quiz: Quiz = {
          id: String(crypto.randomUUID()),
          name: String(formData.name),
          questions: formData.questions,
          active: true,
          creationDate: this.dateUtils.formateDateToInternationFormatString(
            new Date()
          ),
          creatorId: String(userAdminId),
        };

        //Salva dados do usuário no banco de dados
        await this.quizService
          .save(quiz, userAdmin)
          .then(async (result: any) => {
            if (result) {
              // Faz o login automático após o registro e redirecionamento
              const errorMessage = this.translateService.translate(
                'quiz_creation_success'
              );
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'success',
                true
              );
              this.router.navigate([`/quiz-list`]);
            }
          })
          .catch((error: any) => {
            const errorMessage = this.translateService.translate(
              'quiz_creation_error'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'error',
              true
            );
          });
      }
    }
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
