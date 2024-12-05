import { Injectable } from '@angular/core';
import { FirebaseUser } from '../../data/models/FirebaseUser.interface';
import { Database, ref, set, get, child } from '@angular/fire/database';
import {
  Auth,
  onAuthStateChanged,
  User as FirebaseAuthUser,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly databasePath = '/quiz/tdah/score';
  private user: FirebaseUser | null = null;

  constructor(private auth: Auth, private db: Database) {}

  // Pega o usuário autenticado
  getUser(): FirebaseUser | null {
    return (this.user = this.auth.currentUser);
  }

  // Pega o usuário autenticado
  setUser(user: FirebaseUser | null): FirebaseUser | null {
    return (this.user = user);
  }

  // Salva a pontuação do usuário
  async saveUserScore(
    score: Record<string, number>
  ): Promise<Record<string, number> | null> {
    //pega usuário autenticado
    const user = this.getUser();

    if (user) {
      const userId = user.uid;

      try {
        const scoreRef = ref(this.db, `users/${userId}${this.databasePath}`);
        await set(scoreRef, score);
        return score;
      } catch (error: any) {
        console.error('Erro ao salvar pontuação do usuário:', error);
        if (error.code === 'PERMISSION_DENIED') {
          throw new Error('Permissão negada para esse usuário.');
        }
        throw error;
      }
    }

    return null;
  }

  // Busca a pontuação do usuário
  async getUserScore(): Promise<Record<string, number> | null> {
    //pega usuário autenticado
    const user = this.getUser();

    if (user) {
      const userId = user.uid;

      try {
        const dbRef = ref(this.db);
        const snapshot = await get(
          child(dbRef, `users/${userId}${this.databasePath}`)
        );

        if (!snapshot.exists()) {
          throw new Error(
            'Pontuação não encontrada para o usuário especificado.'
          );
        }
        return snapshot.val() as Record<string, number>;
      } catch (error: any) {
        console.error('Erro ao buscar pontuação do usuário:', error);
        if (error.code === 'PERMISSION_DENIED') {
          throw new Error(
            'Permissão negada para acessar os dados desse usuário.'
          );
        }
        throw error;
      }
    }

    return null;
  }
}
