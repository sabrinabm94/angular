import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

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
      return userCredential.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  // Obter usuário logado
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
