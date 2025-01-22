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
  async configureAuthPersistence(): Promise<void> {
    try {
      await this.auth.setPersistence(browserLocalPersistence);
    } catch (error) {
      const errorMessage = 'Erro ao configurar persistência de dados';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
    }
  }

  // Registrar usuário com e-mail e senha
  async register(email: string, password: string): Promise<User | null> {
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
  async loginWithEmail(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(userCredential);
      this.userService.setUser(
        this.userService.convertFirebaseAuthToUser(userCredential.user)
      );
      return userCredential.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login com e-mail: ${error.message}`);
    }
  }

  // Login com google
  async loginWithGoogle(
    auth: Auth,
    provider: AuthProvider
  ): Promise<User | null> {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login com Google: ${error.message}`);
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
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
      console.log('getCurrentFirebaseUser ');
      console.log(user);
      return user;
    }
    return null;
  }
}
