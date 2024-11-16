import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormsModule, NgForm } from '@angular/forms';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAppModule } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [FirebaseAppModule, BrowserModule, AngularFireAuthModule],
})
export class UserRegistrationComponent {
  user = {
    displayName: '',
    username: '',
    email: '',
    password: '',
  };

  firebaseUser: FirebaseUser = {
    displayName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
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

    // Verifica se o formulário é válido antes de tentar registrar o usuário
    if (this.isFormValid()) {
      const { email, password } = this.user;

      // Chama o Firebase Authentication para criar um novo usuário
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Usuário registrado com sucesso
          console.log('Usuário registrado com sucesso', userCredential);
          // Redireciona para uma outra página, como o painel de usuário
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          // Caso haja erro, mostre a mensagem
          console.error('Erro ao registrar usuário:', error);
        });
    }
  }

  validEmail(email: string): boolean {
    return this.emailUtils.validEmail(email);
  }

  // Função de validação do formulário
  isFormValid(): boolean {
    return (
      this.user.displayName.trim() !== '' &&
      this.user.username.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== ''
    );
  }

  // Função para limpar os campos do formulário
  resetForm(form: NgForm) {
    form.reset();
    this.submitted = false;
  }
}
