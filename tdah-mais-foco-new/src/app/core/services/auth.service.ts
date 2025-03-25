import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  browserLocalPersistence,
  getAuth,
  updateEmail,
  updatePassword,
  signInWithPopup,
  AuthProvider,
} from '@angular/fire/auth';
import { UserService } from './user.service';
import { TranslateService } from './translate.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private userService: UserService,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  // Função para configurar persistência
  public async configureAuthPersistence(): Promise<void> {
    try {
      await this.auth.setPersistence(browserLocalPersistence);
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'persistence_configuration_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
  }

  // Registrar usuário com e-mail e senha
  public async register(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error: any) {
      const errorMessage = this.translateService.translate(
        'user_creation_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async updateFirebaseAuthUserEmail(
    userToUpdateId: string,
    newEmail: string
  ): Promise<string | null> {
    if (userToUpdateId) {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          await updateEmail(currentUser, newEmail).then((result) => {
            return newEmail;
          });
        } catch (error) {
          const errorMessage = this.translateService.translate(
            'user_email_update_error'
          );
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'error',
            true
          );
        }
      } else {
        const errorMessage = this.translateService.translate(
          'current_user_data_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }

    return null;
  }

  public async updateFirebaseAuthUserPassword(
    newPassword: string
  ): Promise<string | null> {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updatePassword(currentUser, newPassword).then((result) => {
          return newPassword;
        });
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'user_password_update_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    } else {
      const errorMessage = this.translateService.translate(
        'current_user_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }

    return null;
  }

  // Login com e-mail e senha
  public async loginWithEmail(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (response) {
        const user = response.user;

        //Atualiza usuário ativo
        this.userService.setUser(
          this.userService.convertFirebaseAuthToUser(user)
        );
        return user;
      }
      return null;
    } catch (error: any) {
      const errorMessage = this.translateService.translate('user_login_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  //Login com Google
  public async loginWithGoogle(
    auth: Auth,
    provider: AuthProvider
  ): Promise<User | null> {
    try {
      const response = await signInWithPopup(auth, provider);

      if (response) {
        const user = response.user;

        //Atualiza usuário ativo
        this.userService.setUser(
          this.userService.convertFirebaseAuthToUser(user)
        );
        return user;
      }
      return null;
    } catch (error: any) {
      const errorMessage = this.translateService.translate('user_login_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  // Logout do usuário
  public async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      //Atualiza usuário ativo
      this.userService.setUser(null);
    } catch (error) {
      const errorMessage =
        this.translateService.translate('user_loggout_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
  }

  // Retorna usuário autenticado
  public getCurrentFirebaseUser(): any | null {
    let user = getAuth().currentUser; // Retorna o usuário autenticado no momento ou null se ninguém estiver logado
    if (user) {
      return user;
    }
    return null;
  }
}
