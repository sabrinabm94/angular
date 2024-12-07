import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseUser } from '../../data/models/FirebaseUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any = null;
  private userLoaded: boolean = false;

  constructor(private auth: Auth) {}

  initializeUser(): Promise<void> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        this.user = user;
        this.userLoaded = true;
        resolve(); // Finaliza o processo de inicialização
      });
    });
  }

  getUser(): any {
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

  async getUserScore(): Promise<Record<string, number> | null> {
    const user = this.getUser();
    console.log('user service get score user ', user);

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
