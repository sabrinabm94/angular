import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';
import { Role } from '../../../../data/models/enums/role.enum';
import { DateUtils } from '../../../../core/utils/date.utils';

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
    ErrorMessageComponent,
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
    role: Role.none,
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
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    await this.getUserToManage();
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

  private async getUserToManage(): Promise<FirebaseUser | null> {
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

      let currentUserData: FirebaseUser | null =
        this.authService.getCurrentFirebaseUser();

      if (userData && currentUserData) {
        let user = userData;
        user.email = currentUserData.email;
        //user.password = currentUserData.password;
        return user;
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
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
          // Atualiza no banco de dados
          await this.userService
            .updateUserData(newUserToManage)
            .then(async (response) => {
              if (response) {
                // Verifica se o e-mail foi alterado salva atualizado
                const currentUser: FirebaseUser | null =
                  this.authService.getCurrentFirebaseUser();
                if (
                  newUserToManage &&
                  newUserToManage.email &&
                  currentUser?.email !== newUserToManage.email
                ) {
                  //Atualiza e-mail do usuário no auth do firebase
                  await this.authService.updateEmail(newUserToManage.email);
                }

                alert(this.translateService.translate('update_success'));
                return response;
              }
              return null;
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados do usuário:', error);
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
