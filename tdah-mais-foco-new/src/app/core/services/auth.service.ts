import { Injectable } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private userService: UserService) {}

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
      this.auth.setPersistence(browserLocalPersistence);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    await this.auth.signOut();
    this.userService.setUser(null);
  }
}
