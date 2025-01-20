import { Auth } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
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
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';
import { DateUtils } from '../../../../core/utils/date.utils';
import { Role } from '../../../../data/models/enums/role.enum';

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
  user: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '2000-01-01',
    ocupation: Occupation.student,
    gender: Gender.male,
    educationLevel: EducationLevel.high_school,
    active: true,
  };

  usersList: FirebaseUser[] | null = [];

  genderOptions: Gender[] = [];
  occupationOptions: Occupation[] = [];
  educationLevelOptions: EducationLevel[] = [];
  submitted: boolean = false;
  roleOptions: Role[] = [];

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private authService: AuthService,
    private dateUtils: DateUtils
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    await this.loadUser();
    await this.loadUsersList(this.user);
  }

  private getFormOptions() {
    this.genderOptions = Object.values(Gender);
    this.occupationOptions = Object.values(Occupation);
    this.educationLevelOptions = Object.values(EducationLevel);
    this.roleOptions = Object.values(Role);
  }

  private async loadUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.user = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.user;
  }

  private async loadUsersList(
    currentUser: FirebaseUser | null
  ): Promise<FirebaseUser[] | null> {
    if (currentUser) {
      try {
        const usersList = await this.userService.getAllUsersData(currentUser);
        if (usersList) return (this.usersList = usersList);
      } catch (error) {
        console.error('Erro ao carregar lista de usuários:', error);
      }
    }
    return null;
  }

  async onSaveUser(): Promise<void> {
    if (this.user) {
      try {
        await this.userService.saveUserData(this.user);
        alert('Usuário salvo com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    }
  }

  public async getUserDataById(id: string): Promise<FirebaseUser | null> {
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

  public async updateUserData(id: string | null): Promise<void> {
    if (id) {
      this.submitted = true;
      const userToUpdate = await this.getUserDataById(id);

      if (this.isFormValid() && userToUpdate) {
        // Atualiza no banco de dados
        await this.userService
          .updateUserData(userToUpdate)
          .then(async (response) => {
            // Verifica se o e-mail foi alterado e atualiza no auth do Firebase
            const userToUpdateFirebase: FirebaseUser | null =
              this.authService.getCurrentFirebaseUser();
            if (
              userToUpdate &&
              userToUpdate.email &&
              userToUpdateFirebase?.email !== userToUpdate.email
            ) {
              await this.authService.updateEmail(userToUpdate.email);
            }

            alert(this.translateService.translate('update_success'));
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados do usuário:', error);
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
      const isPasswordValid =
        !this.user.password || this.user.password?.trim() !== '';
      const isEmailValid = !this.user.email || this.validEmail(this.user.email);

      return isDisplayNameValid && isPasswordValid && isEmailValid;
    }
    return false;
  }

  private clearUserCredentials() {
    this.user = {
      displayName: '',
      email: '',
      password: '',
      uid: '',
      role: Role.none,
      active: true,
    };
  }
}
