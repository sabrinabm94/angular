import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
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
    ErrorMessageComponent,
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
        console.error('Erro ao carregar os dados do usuário:', error);
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

      let currentUserData: FirebaseUser | null =
        this.authService.getCurrentFirebaseUser();

      if (userData && currentUserData) {
        let user = userData;
        user.email = currentUserData.email;
        //user.password = currentUserData.password;
        return user;
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
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
          .then(async (response) => {
            console.log('response', response);
            if (response) {
              // Verifica se o e-mail foi alterado salva atualizado
              const currentUser: FirebaseUser | null =
                this.authService.getCurrentFirebaseUser();
              if (
                newUser &&
                newUser.email &&
                currentUser?.email !== newUser.email
              ) {
                //Atualiza e-mail do usuário no auth do firebase
                await this.authService.updateEmail(newUser.email);
              }

              alert(this.translateService.translate('update_success'));
            }
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
      const isEmailValid = !this.user.email || this.validEmail(this.user.email);

      return isDisplayNameValid && isEmailValid;
    }
    return false;
  }
}
