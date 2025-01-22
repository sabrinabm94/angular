import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
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
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component } from '@angular/core';
import { DateUtils } from '../../../../core/utils/date.utils';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';
import { Role } from '../../../../data/models/enums/role.enum';

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
    ErrorMessageComponent,
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

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private userService: UserService
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

    if (this.isFormValid() && this.user) {
      //cria objeto de usuário a partir de formulário
      const newUser: FirebaseUser = {
        active: this.user.active,
        birthdate: this.user.birthdate,
        displayName: this.user.displayName,
        educationLevel: this.user.educationLevel,
        email: this.user.email,
        gender: this.user.gender,
        ocupation: this.user.ocupation,
        role: this.user.role,
        uid: this.user.uid,
        creationDate: this.dateUtils.formateDateToInternationFormatString(
          new Date()
        ),
        creatorId: this.user.uid,
        password: this.user.password,
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

              //Adiciona o usuário criado com os ids gerados pelo firebase
              newUser.uid = firebaseUser.uid;
              newUser.creatorId = firebaseUser.uid;

              //Salva dados do usuário no banco de dados
              await this.userService
                .saveUserData(newUser)
                .then(async (result) => {
                  if (result) {
                    // Faz o login automático após o registro e redirecionamento
                    this.userService.setUser(newUser);
                    alert(this.translateService.translate('register_success'));
                    this.router.navigate(['/quiz']);
                  }
                })
                .catch((error: any) => {
                  console.error('Erro ao salvar dados de usuário:', error);
                  alert(this.translateService.translate('invalid_data'));
                });
            }
          })
          .catch((error: any) => {
            console.error('Erro ao criar usuário:', error);
            alert(this.translateService.translate('invalid_data'));
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
