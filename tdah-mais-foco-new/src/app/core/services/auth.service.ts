import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  browserLocalPersistence,
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
}
