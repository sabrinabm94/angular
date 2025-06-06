import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../../shared/components/fieldset/fieldset.component';
import { AlertMessageComponent } from '../../../../../shared/components/alert-message/alert-message.component';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../../core/services/translate.service';
import { UserService } from '../../../../../core/services/user.service';
import { DateUtils } from '../../../../../core/utils/date.utils';
import { EmailUtils } from '../../../../../core/utils/email.utils';
import { EducationLevel } from '../../../../../data/models/enums/user/user-educationLevel.enum';
import { Gender } from '../../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../../data/models/enums/user/user-occupation.enum';
import { Role } from '../../../../../data/models/enums/user/user-role.enum';
import { FirebaseUser } from '../../../../../data/models/user/Firebase-user.interface';
import { AlertService } from '../../../../../core/services/alert.service';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css'],
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
export class UserManageComponent implements OnInit {
  @Input()
  userAdminId: string | null = null;

  userToManage: FirebaseUser | null = {
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
  roleOptions: Role[] = [];

  constructor(
    private emailUtils: EmailUtils,
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    await this.getUserToManageById();
  }

  private getFormOptions() {
    this.genderOptions = Object.values(Gender);
    this.occupationOptions = Object.values(Occupation);
    this.educationLevelOptions = Object.values(EducationLevel);
    this.roleOptions = Object.values(Role);
  }

  private getUserToManageIdFromUrl() {
    return this.route.snapshot.paramMap.get('id') || null;
  }

  private async getUserToManageById(): Promise<FirebaseUser | null> {
    const userToManageId = this.getUserToManageIdFromUrl();

    if (userToManageId) {
      return (this.userToManage = await this.getUserInfoById(userToManageId));
    }

    return null;
  }

  public async getUserInfoById(id: string): Promise<FirebaseUser | null> {
    try {
      let userData: FirebaseUser | null = await this.userService
        .getUserDataById(id)
        .then((result) => result);

      if (userData) {
        return userData;
      }
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
      if (
        this.isFormValid(userToManage) === true &&
        userAdminId &&
        userToManage
      ) {
        const userToManageNewData: FirebaseUser = {
          active: JSON.parse(String(userToManage.active)),
          birthdate: String(userToManage.birthdate),
          displayName: String(userToManage.displayName),
          educationLevel: userToManage.educationLevel,
          email: String(userToManage.email),
          gender: userToManage.gender,
          ocupation: userToManage.ocupation,
          role: userToManage.role,
          uid: String(userToManage.uid),
          updateDate: this.dateUtils.formateDateToInternationFormatString(
            new Date()
          ),
          updaterId: String(userAdminId),
          password: String(userToManage.password),
        };

        if (userToManageNewData) {
          //Atualiza e-mail do usuário no firebase
          /*
          await this.authService
            .updateFirebaseAuthUserEmail(
              userToManageNewData.uid,
              userToManageNewData.email
            )
            .then(async (result) => {
              if (result) {
                // Atualiza usuário no banco de dados

              }
              return null;
            })
            .catch((error) => {
              const errorMessage = this.translateService.translate(
        'user_data_error'
      );
      this.alertService.alertMessageTriggerFunction(errorMessage, 'error', true);
            });
            */

          await this.userService
            .updateUserData(userToManageNewData)
            .then(async (result) => {
              if (result) {
                const errorMessage =
                  this.translateService.translate('user_data_success');
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
              const errorMessage =
                this.translateService.translate('user_data_error');
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

  public validEmail(email: string | null): boolean {
    if (email) {
      return this.emailUtils.validEmail(email);
    }
    return false;
  }

  public isFormValid(user: FirebaseUser): boolean {
    if (user) {
      const isDisplayNameValid =
        !user.displayName || user.displayName?.trim() !== '';
      const isEmailValid = !user.email || this.validEmail(user.email);

      return isDisplayNameValid && isEmailValid;
    }
    return false;
  }
}
