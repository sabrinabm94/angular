import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { CommonModule } from '@angular/common';
import { FirebaseAppModule } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../core/services/translate.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FirebaseAppModule,
    AngularFireAuthModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
    TranslatePipe,
  ],
})
export class UserloginComponent {
  user = {
    email: '',
    password: '',
  };

  submitted = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private emailUtils: EmailUtils,
    private translateService: TranslateService
  ) {}

  loginUser() {
    this.submitted = true;
    this.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((result) => {
        console.log(result);
        // Navegação após o login bem-sucedido
        alert(this.translateService.translate('login_success'));
        setTimeout(() => {
          this.router.navigate(['/quiz']);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        alert(this.translateService.translate('login_failed'));
      })
      .finally(() => {
        this.clearUserCredentials();
      });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    this.auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        this.router.navigate(['/quiz']);
      })
      .catch((error) => {
        console.error(error);
        alert(this.translateService.translate('login_failed'));
      });
  }

  validEmail(email: string): boolean {
    return this.emailUtils.validEmail(email);
  }

  isFormValid(): boolean {
    return this.user.email.trim() !== '' && this.user.password.trim() !== '';
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }

  // Função de recuperação de senha
  resetPassword() {
    if (!this.user.email || !this.validEmail(this.user.email)) {
      alert(this.translateService.translate('invalid_email'));
      return;
    }

    this.auth
      .sendPasswordResetEmail(this.user.email)
      .then(() => {
        alert(this.translateService.translate('password_reset_email_sent'));
      })
      .catch((error) => {
        console.error(error);
        alert(this.translateService.translate('password_reset_error'));
      });
  }

  private clearUserCredentials() {
    this.user.email = '';
    this.user.password = '';
  }
}
