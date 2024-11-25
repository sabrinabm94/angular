import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  User,
  sendPasswordResetEmail,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
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

  // Login com Google
  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error: any) {
      throw new Error(`Erro ao fazer login com Google: ${error.message}`);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw new Error(`Erro ao fazer logout: ${error.message}`);
    }
  }

  // Atualizar informações do perfil
  async updateProfile(
    user: User,
    displayName: string | null,
    photoURL: string | null
  ): Promise<void> {
    try {
      await updateProfile(user, { displayName, photoURL });
    } catch (error: any) {
      throw new Error(`Erro ao atualizar perfil: ${error.message}`);
    }
  }

  // Atualizar email
  async updateEmail(user: User, newEmail: string): Promise<void> {
    try {
      await updateEmail(user, newEmail);
    } catch (error: any) {
      throw new Error(`Erro ao atualizar e-mail: ${error.message}`);
    }
  }

  // Atualizar senha
  async updatePassword(user: User, newPassword: string): Promise<void> {
    try {
      await updatePassword(user, newPassword);
    } catch (error: any) {
      throw new Error(`Erro ao atualizar senha: ${error.message}`);
    }
  }

  // Enviar e-mail de redefinição de senha
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw new Error(`Erro ao enviar redefinição de senha: ${error.message}`);
    }
  }

  // Desativar usuário (excluir conta)
  async deactivateUser(user: User): Promise<void> {
    try {
      await deleteUser(user);
    } catch (error: any) {
      throw new Error(`Erro ao desativar usuário: ${error.message}`);
    }
  }
}
