import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, ref, child, get, set } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/FirebaseUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: FirebaseUser | null = null;
  private userLoaded: boolean = false;
  private databasePath: string = '';

  constructor(private auth: Auth, private database: Database) {
    this.initializeUser();
  }

  initializeUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          this.user = user;
          this.userLoaded = true;

          // Define o caminho do banco de dados com base no usuário autenticado
          if (user) {
            this.databasePath = `users/${user.uid}/quiz/tdah/score`;
          }

          resolve();
        },
        (error) => {
          console.error('Erro ao carregar estado do usuário:', error);
          reject(error);
        }
      );
    });
  }

  getUser(): FirebaseUser | null {
    return this.user;
  }

  isUserLoaded(): boolean {
    return this.userLoaded;
  }

  setUser(user: FirebaseUser | null): FirebaseUser | null {
    this.user = user;
    return this.user;
  }

  async saveUserScore(
    score: Record<string, number>
  ): Promise<Record<string, number> | null> {
    const user = this.getUser();
    console.log('user service save score user ', user);

    if (user) {
      try {
        const scoreRef = ref(this.database, this.databasePath);
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

  async getUserScore(): Promise<Record<string, number> | null> {
    const user = this.getUser();
    console.log('user service get score user ', user);

    if (user) {
      try {
        const dbRef = ref(this.database);
        const snapshot = await get(child(dbRef, this.databasePath));

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
