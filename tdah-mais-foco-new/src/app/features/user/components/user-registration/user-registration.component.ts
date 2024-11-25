import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAppModule } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [
    FirebaseAppModule,
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    ContainerComponent,
    ErrorMessageComponent,
    FieldsetComponent,
    TranslatePipe,
    ButtonComponent,
  ],
})
export class UserRegistrationComponent {
  user = {
    displayName: '',
    username: '',
    email: '',
    password: '',
  };

  submitted = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private emailUtils: EmailUtils
  ) {}

  // Função chamada ao enviar o formulário
  registerUser() {
    this.submitted = true;

    if (this.isFormValid()) {
      const { email, password } = this.user;

      // Chama o Firebase Authentication para criar um novo usuário
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('Usuário registrado com sucesso:', userCredential);
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('Erro ao registrar usuário:', error);
        });
    }
  }

  // Função de validação de e-mail
  validEmail(email: string): boolean {
    return this.emailUtils.validEmail(email);
  }

  // Função de validação do formulário
  isFormValid(): boolean {
    const { displayName, username, email, password } = this.user;
    return (
      displayName.trim() !== '' &&
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      this.validEmail(email)
    );
  }

  // Função para limpar os campos do formulário
  resetForm(form: NgForm) {
    form.reset();
    this.submitted = false;
  }
}
