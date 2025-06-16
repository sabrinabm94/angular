import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/user/Firebase-user.interface';
import { Router } from '@angular/router';
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
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Gender } from '../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../data/models/enums/user/user-occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/user/user-educationLevel.enum';
import { DateUtils } from '../../../../core/utils/date.utils';
import { Role } from '../../../../data/models/enums/user/user-role.enum';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
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
  ],
})
export class UserProfileComponent implements OnInit {
  user: FirebaseUser | null = {
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
    private emailUtils: EmailUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private authService: AuthService,
    private dateUtils: DateUtils,
    private alertService: AlertService
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    const currentUser = this.userService.getUser();

    if (currentUser && currentUser.uid) {
      try {
        const userData = await this.getUserData(currentUser.uid);
        if (userData) {
          // Atualiza o formulário com os dados do usuário
          this.user = { ...this.user, ...userData };
          this.user.uid = currentUser.uid;
        }
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'current_user_data_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
  }

  private getFormOptions() {
    this.genderOptions = Object.values(Gender);
    this.occupationOptions = Object.values(Occupation);
    this.educationLevelOptions = Object.values(EducationLevel);
  }

  public async getUserData(id: string): Promise<FirebaseUser | null> {
    try {
      let userData: FirebaseUser | null = await this.userService
        .getUserDataById(id)
        .then((result) => result);

      if (userData) {
        return userData;
      }
      return null;
    } catch (error) {
      const errorMessage = this.translateService.translate('user_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async updateUserInfo(
    userToManage: FirebaseUser | null,
    userAdminId: string | null
  ): Promise<FirebaseUser | null> {
    if (userToManage && userAdminId) {
      this.submitted = true;
      if (this.isFormValid() === true && userAdminId && userToManage) {
        let newUserToManage: FirebaseUser = {
          active: userToManage.active,
          birthdate: userToManage.birthdate,
          displayName: userToManage.displayName,
          educationLevel: userToManage.educationLevel,
          email: userToManage.email,
          gender: userToManage.gender,
          ocupation: userToManage.ocupation,
          role: userToManage.role,
          uid: userToManage.uid,
          updateDate: this.dateUtils.formateDateToInternationFormatString(
            new Date()
          ),
          updaterId: userAdminId,
          password: userToManage.password,
        };

        if (newUserToManage) {
          /* await this.authService
            .updateFirebaseAuthUserEmail(
              newUserToManage.uid,
              newUserToManage.email
            )
            .then(async (result) => {
              if (result) {
                // Atualiza usuário no banco de dados

              }
              return null;
            })
            .catch((error) => {
              const errorMessage = this.translateService.translate(
      'user_data_update_error'
);
this.alertService.alertMessageTriggerFunction(errorMessage, 'error', true);

            }); */

          //Atualiza e-mail do usuário no firebase
          await this.userService
            .updateUserData(newUserToManage)
            .then((result) => {
              if (result) {
                const errorMessage = this.translateService.translate(
                  'user_update_data_success'
                );
                this.alertService.alertMessageTriggerFunction(
                  errorMessage,
                  'success',
                  true
                );
                return result;
              }
              return null;
            })
            .catch((error) => {
              const errorMessage = this.translateService.translate(
                'user_data_update_error'
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
    return null;
  }

  public async updateUserData(): Promise<void> {
    this.submitted = true;

    if (this.isFormValid() === true && this.user) {
      let newUser: FirebaseUser = {
        active: this.user.active,
        birthdate: this.user.birthdate,
        displayName: this.user.displayName,
        educationLevel: this.user.educationLevel,
        email: this.user.email,
        gender: this.user.gender,
        ocupation: this.user.ocupation,
        role: this.user.role,
        uid: this.user.uid,
        updateDate: this.dateUtils.formateDateToInternationFormatString(
          new Date()
        ),
        updaterId: this.user.uid,
        password: this.user.password,
      };

      if (newUser) {
        // Atualiza no banco de dados
        await this.userService
          .updateUserData(newUser)
          .then(async (result) => {
            if (result) {
              // Verifica se o e-mail foi alterado salva atualizado
              const currentUser: FirebaseUser | null =
                this.authService.getCurrentFirebaseUser();
              if (
                newUser &&
                newUser.email &&
                currentUser?.email !== newUser.email
              ) {
                //Atualiza e-mail do usuário no auth do firebase
                await this.authService.updateFirebaseAuthUserEmail(
                  newUser.uid,
                  newUser.email
                );
              }

              const errorMessage = this.translateService.translate(
                'user_update_data_sucess'
              );
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'success',
                true
              );
            }
          })
          .catch((error) => {
            const errorMessage = this.translateService.translate(
              'user_data_update_error'
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
      const isDisplayNameValid =
        !this.user.displayName || this.user.displayName?.trim() !== '';
      const isEmailValid = !this.user.email || this.validEmail(this.user.email);

      return isDisplayNameValid && isEmailValid;
    }
    return false;
  }
}
