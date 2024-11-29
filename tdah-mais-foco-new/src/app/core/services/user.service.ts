import { Injectable } from '@angular/core';
import { FirebaseUser } from '../../data/models/user-firebase.interface';
import { Database, ref, update, get, child } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: FirebaseUser | null = null;
  private readonly tdahQuizScorePath = '/quiz/tdah/score';

  constructor(private auth: Auth, private db: Database) {}

  // Define o usuário atual
  setUser(user: FirebaseUser): void {
    this.user = user;
  }

  // Retorna o usuário atual
  getUser(): FirebaseUser | null {
    return this.user;
  }

  // Salva a pontuação do usuário no Realtime Database
  async saveUserScore(
    uid: string,
    score: Record<string, number>
  ): Promise<void> {
    try {
      const scoreRef = ref(this.db, `users/${uid}${this.tdahQuizScorePath}`);
      await update(scoreRef, score);
    } catch (error) {
      console.error('Erro ao salvar pontuação do usuário:', error);
      throw error;
    }
  }

  // Busca a pontuação do usuário no Realtime Database
  async getUserScore(uid: string): Promise<Record<string, number>> {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(
        child(dbRef, `users/${uid}${this.tdahQuizScorePath}`)
      );
      const score = snapshot.exists()
        ? (snapshot.val() as Record<string, number>)
        : {};
      return score;
    } catch (error) {
      console.error('Erro ao buscar pontuação do usuário:', error);
      throw error;
    }
  }
}
