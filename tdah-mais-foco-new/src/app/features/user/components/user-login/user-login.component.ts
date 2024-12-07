import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { TranslateService } from '../../../../core/services/translate.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

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
  ],
})
export class UserLoginComponent {
  user = { email: '', password: '' };
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
    if (!this.user.email || !this.validEmail(this.user.email)) {
      alert(this.translateService.translate('invalid_email'));
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.user.email);
      alert(this.translateService.translate('password_reset_email_sent'));
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      alert(this.translateService.translate('password_reset_error'));
    }
  }

  async loginWithEmail() {
    this.submitted = true;

    if (this.user.email && this.user.password) {
      try {
        this.authService
          .login(this.user.email, this.user.password)
          .then((user: FirebaseUser | null) => {
            if (user) {
              alert(this.translateService.translate('login_success'));
              this.router.navigate([`/result/${user.uid}`]);
            }
          });
      } catch (error) {
        console.error(error);
        alert(this.translateService.translate('invalid_data'));
      } finally {
        this.clearUserCredentials();
      }
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const loggedUser = {
        email: String(result.user.email),
        displayName: String(result.user.displayName),
        uid: String(result.user.uid),
      };

      this.userService.setUser(loggedUser);
      alert(this.translateService.translate('login_success'));
      this.router.navigate([`/result/${loggedUser.uid}`]);
    } catch (error) {
      console.error(error);
      alert(this.translateService.translate('invalid_data'));
    } finally {
      this.clearUserCredentials();
    }
  }

  validEmail(email: string): boolean {
    return this.emailUtils.validEmail(email);
  }

  isFormValid(): boolean {
    return this.user.email.trim() !== '' && this.user.password.trim() !== '';
  }

  private clearUserCredentials() {
    this.user = { email: '', password: '' };
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}
