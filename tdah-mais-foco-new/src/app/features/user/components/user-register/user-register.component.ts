import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/user/Firebase-user.interface';
import { Router, RouterModule } from '@angular/router';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { AlertMessageComponent } from '../../../../shared/components/alert-message/alert-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component } from '@angular/core';
import { DateUtils } from '../../../../core/utils/date.utils';
import { Gender } from '../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../data/models/enums/user/user-occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../data/models/enums/user/user-role.enum';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
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
    AlertMessageComponent,
    TranslatePipe,
    RouterModule,
  ],
})
export class UserRegisterComponent {
  user: FirebaseUser = {
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

  genderOptions: Gender[] = [];
  occupationOptions: Occupation[] = [];
  educationLevelOptions: EducationLevel[] = [];

  submitted: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.getFormOptions();
  }

  private getFormOptions() {
    this.genderOptions = Object.values(Gender);
    this.occupationOptions = Object.values(Occupation);
    this.educationLevelOptions = Object.values(EducationLevel);
  }

  public async registerUser(): Promise<void> {
    this.submitted = true;
    const formData = this.user;

    if (this.isFormValid() && this.user) {
      const newUser: FirebaseUser = {
        active: JSON.parse(String(formData.active)),
        birthdate: String(formData.birthdate),
        displayName: String(formData.displayName),
        educationLevel: formData.educationLevel,
        email: String(formData.email),
        gender: formData.gender,
        ocupation: formData.ocupation,
        role: formData.role,
        uid: String(formData.uid),
        creationDate: this.dateUtils.formateDateToInternationFormatString(
          new Date()
        ),
        creatorId: String(formData.uid),
        password: String(formData.password),
      };

      if (newUser && this.auth && this.user) {
        //Cria usuário no autenticador do firebase
        await createUserWithEmailAndPassword(
          this.auth,
          this.user.email,
          this.user.password ? this.user.password : ''
        )
          .then(async (result: any) => {
            if (result && result.user) {
              //Pega dados do retorno do usuário criado pelo firebase
              const firebaseUser = result.user;

              //Adiciona o usuário a ser criado com o id gerados pelo auth do firebase
              newUser.uid = firebaseUser.uid;
              newUser.creatorId = firebaseUser.uid;

              //Salva dados do usuário no banco de dados
              await this.userService
                .saveUserData(newUser)
                .then(async (result) => {
                  if (result) {
                    // Faz o login automático após o registro e redirecionamento
                    this.userService.setUser(newUser);
                    const errorMessage = this.translateService.translate(
                      'user_creation_success'
                    );
                    this.alertService.alertMessageTriggerFunction(
                      errorMessage,
                      'success',
                      true
                    );
                    this.router.navigate(['/quiz']);
                  }
                })
                .catch((error: any) => {
                  const errorMessage = this.translateService.translate(
                    'user_creation_error'
                  );
                  this.alertService.alertMessageTriggerFunction(
                    errorMessage,
                    'error',
                    true
                  );
                });
            }
          })
          .catch((error: any) => {
            const errorMessage = this.translateService.translate(
              'current_user_data_error'
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

  public validEmail(email: string | null): boolean {
    if (email) {
      return this.emailUtils.validEmail(email);
    }
    return false;
  }

  public isFormValid(): boolean {
    if (this.user) {
      const isDisplayNameValid = this.user.displayName?.trim() !== '';
      const isPasswordValid = this.user.password?.trim() !== '';
      const isEmailValid = this.validEmail(this.user.email);

      return isDisplayNameValid && isPasswordValid && isEmailValid;
    }
    return false;
  }
}
