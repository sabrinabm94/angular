import { Injectable } from '@angular/core';
import { FirebaseUser } from '../../data/models/user-firebase.interface';
import { Database, ref, update, get, child, set } from '@angular/fire/database';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: FirebaseUser | null = null;
  private userSubject = new BehaviorSubject<FirebaseUser | null>(null);
  public user$ = this.userSubject.asObservable();
  private readonly tdahQuizScorePath = '/quiz/tdah/score';

  constructor(private auth: Auth, private db: Database) {
    // Escuta mudanças no estado de autenticação
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user as FirebaseUser;
        this.userSubject.next(this.user);
      } else {
        this.user = null;
        this.userSubject.next(null);
      }
    });
  }

  // Define o usuário atual
  setUser(user: FirebaseUser | null): void {
    this.user = user;
    this.userSubject.next(user);
  }

  // Retorna o usuário atual
  getUser(): FirebaseUser | null {
    return this.user;
  }

  // Salva a pontuação do usuário no Realtime Database
  async saveUserScore(
    id: string,
    score: Record<string, number>
  ): Promise<Record<string, number>> {
    if (id) {
      try {
        const scoreRef = ref(this.db, `users/${id}${this.tdahQuizScorePath}`);
        await set(scoreRef, score);
        return score;
      } catch (error) {
        console.error('Erro ao salvar pontuação do usuário:', error);
        throw error;
      }
    } else {
      throw new Error('ID do usuário é inválido');
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
