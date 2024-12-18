import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
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
import { Component } from '@angular/core';
import { DateUtils } from '../../../../core/utils/date.utils';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';

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
  ],
})
export class UserRegisterComponent {
  user: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '2000-01-01',
    ocupation: Occupation.student,
    gender: Gender.male,
    educationLevel: EducationLevel.high_school,
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

    if (this.isFormValid()) {
      if (this.user && this.user.email && this.user.password) {
        await createUserWithEmailAndPassword(
          this.auth,
          this.user.email,
          this.user.password
        )
          .then(async (result: any) => {
            if (result && result.user && this.user) {
              // Faz o login automático após o registro
              let newUser: FirebaseUser = {
                uid: result.user.uid,
                displayName: this.user.displayName ? this.user.displayName : '',
                email: this.user.email ? this.user.email : '',
                //password: this.user.password ? this.user.password : '',
                birthdate: this.user.birthdate ? this.user.birthdate : '',
                ocupation: this.user ? this.user.ocupation : Occupation.student,
                gender: this.user ? this.user.gender : Gender.male,
                educationLevel: this.user
                  ? this.user.educationLevel
                  : EducationLevel.high_school,
              };

              this.user = this.userService.setUser(newUser);

              await this.userService.saveUserData(newUser).then((response) => {
                alert(this.translateService.translate('register_success'));
                this.router.navigate(['/quiz']);
              });
            }
          })
          .catch((error: any) => {
            console.error('Erro ao registrar usuário:', error);
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

  private clearUserCredentials() {
    this.user = {
      displayName: '',
      email: '',
      password: '',
      uid: '',
    };
  }
}
