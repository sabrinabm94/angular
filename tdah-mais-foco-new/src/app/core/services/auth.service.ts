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
    } catch (error) {}
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

  public async updateEmail(newEmail: string): Promise<string | null> {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updateEmail(currentUser, newEmail).then((result) => {
          return newEmail;
        });
      } catch (error) {
        console.error('Erro ao atualizar credenciais:', error);
      }
    } else {
      console.error('Nenhum usuário está logado.');
    }

    return null;
  }

  public async updatePassword(newPassword: string): Promise<string | null> {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updatePassword(currentUser, newPassword).then((result) => {
          return newPassword;
        });
      } catch (error) {
        console.error('Erro ao atualizar credenciais:', error);
      }
    } else {
      console.error('Nenhum usuário está logado.');
    }

    return null;
  }

  // Login com e-mail e senha
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.userService.setUser(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userService.setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Retorna usuário autenticado
  public getCurrentFirebaseUser(): User | null {
    const auth = getAuth();
    return auth.currentUser; // Retorna o usuário autenticado no momento ou null se ninguém estiver logado
  }
}
