import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormsModule, NgForm } from '@angular/forms';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from 'src/app/shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { EmailUtils } from 'src/app/core/utils/email.utils';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [
    FormsModule,
    TranslocoModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
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
    private translocoService: TranslocoService,
    private emailUtils: EmailUtils
  ) {}

  loginUser() {
    this.submitted = true;
    this.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((result) => {
        console.log(result);
        // Navegação após o login bem-sucedido
        alert(this.translocoService.translate('login_success'));
        setTimeout(() => {
          this.router.navigate(['/quiz']);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        alert(this.translocoService.translate('login_failed'));
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
        alert(this.translocoService.translate('login_failed'));
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
      alert(this.translocoService.translate('invalid_email_message'));
      return;
    }

    this.auth
      .sendPasswordResetEmail(this.user.email)
      .then(() => {
        alert(this.translocoService.translate('password_reset_email_sent'));
      })
      .catch((error) => {
        console.error(error);
        alert(this.translocoService.translate('password_reset_error'));
      });
  }

  private clearUserCredentials() {
    this.user.email = '';
    this.user.password = '';
  }
}
