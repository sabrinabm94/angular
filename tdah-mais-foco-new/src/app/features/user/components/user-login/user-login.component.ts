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
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';
import { TranslateService } from '../../../../core/services/translate.service';
import { CommonModule } from '@angular/common';

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
        const result = await signInWithEmailAndPassword(
          this.auth,
          this.user.email,
          this.user.password
        );
        const loggedUser: FirebaseUser = {
          email: result.user.email,
          displayName: result.user.displayName,
          uid: result.user.uid,
        };

        this.userService.setUser(loggedUser);
        alert('Login realizado com sucesso!');
        this.router.navigate([`/quiz/${loggedUser.uid}`]);
      } catch (error) {
        console.error(error);
        alert('Falha no login. Tente novamente.');
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
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid,
      };

      this.userService.setUser(loggedUser);
      alert('Login com Google realizado com sucesso!');
      this.router.navigate([`/quiz/${loggedUser.uid}`]);
    } catch (error) {
      console.error(error);
      alert('Erro ao usar login com Google.');
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
