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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private userService: UserService) {}

  // Função para configurar persistência
  public async configureAuthPersistence(): Promise<void> {
    try {
      await this.auth.setPersistence(browserLocalPersistence);
    } catch (error) {
      const errorMessage = 'Erro ao configurar persistência de dados';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
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
      throw new Error(`Erro ao registrar: ${error.message}`);
    }
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
          const errorMessage = 'Erro ao atualizar e-mail';
          console.error(errorMessage, error);
          throw new Error(errorMessage + error);
        }
      } else {
        console.error('Nenhum usuário logado.');
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
        const errorMessage = 'Erro ao atualizar senha';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    } else {
      console.error('Nenhum usuário está logado.');
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
      throw new Error(`Erro ao fazer login com e-mail: ${error.message}`);
    }
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
      throw new Error(`Erro ao fazer login com e-mail: ${error.message}`);
    }
  }

  // Logout do usuário
  public async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      //Atualiza usuário ativo
      this.userService.setUser(null);
    } catch (error) {
      const errorMessage = 'Erro ao sair';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
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
