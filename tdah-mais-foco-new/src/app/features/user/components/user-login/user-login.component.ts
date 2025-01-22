import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
import { TranslateService } from '../../../../core/services/translate.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../data/models/enums/role.enum';
import { FirebaseAuth } from '../../../../data/models/Firebase-auth.interface';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
    TranslatePipe,
    RouterModule,
  ],
})
export class UserLoginComponent {
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

  submitted = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private userService: UserService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  async resetPassword() {
    if (this.user) {
      if (!this.user.email || !this.validEmail(this.user.email)) {
        alert(this.translateService.translate('invalid_email'));
        return;
      }

      try {
        await sendPasswordResetEmail(this.auth, this.user.email);
        alert(this.translateService.translate('password_reset_email_sent'));
      } catch (error) {
        alert(this.translateService.translate('password_reset_error'));
        const errorMessage = 'Erro ao enviar e-mail de notificação';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    }
  }

  async loginWithEmail() {
    this.submitted = true;

    if (this.user && this.user.email && this.user.password) {
      try {
        this.authService
          .loginWithEmail(this.user.email, this.user.password)
          .then((result: any) => {
            if (result) {
              const user = result;
              this.userService.setUser(
                this.userService.convertFirebaseAuthToUser(user)
              );
              alert(this.translateService.translate('login_success'));
              this.router.navigate([`/result/${user.uid}`]);
            }
          });
      } catch (error) {
        console.error(error);
        alert(this.translateService.translate('invalid_data'));
      }
    }
  }

  async loginWithGoogle() {
    this.submitted = true;

    if (this.auth) {
      try {
        const provider = new GoogleAuthProvider();
        this.authService
          .loginWithGoogle(this.auth, provider)
          .then((result: any) => {
            if (result) {
              const user = result;
              this.userService.setUser(
                this.userService.convertFirebaseAuthToUser(user)
              );
              alert(this.translateService.translate('login_success'));
              this.router.navigate([`/result/${user.uid}`]);
            }
          });
      } catch (error) {
        console.error(error);
        alert(this.translateService.translate('invalid_data'));
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
      return (
        this.user.password?.trim() !== '' && this.validEmail(this.user.email)
      );
    }
    return false;
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}
