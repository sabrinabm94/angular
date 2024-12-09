import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/FirebaseUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: FirebaseUser | null = null;
  private userLoaded: boolean = false;
  private databaseQuizPath: string = '/quiz/tdah/score/';
  private databaseUserPath: string = '/users/';

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

    if (user) {
      try {
        let databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;

        // Garantir que algo seja salvo, mesmo que o score esteja vazio
        const dataToSave =
          Object.keys(score).length > 0 ? score : { default: 0 };

        const scoreRef = ref(this.database, databasePath);
        await set(scoreRef, dataToSave);
        return dataToSave;
      } catch (error: any) {
        console.error('Erro ao salvar pontuação no Firebase:', error);
        if (error.code === 'PERMISSION_DENIED') {
          throw new Error('Permissão negada para esse usuário.');
        }
        throw error;
      }
    }

    console.warn(
      'Nenhum usuário autenticado encontrado. Pontuação não foi salva.'
    );
    return null;
  }

  async saveUserData(user: FirebaseUser): Promise<FirebaseUser | null> {
    try {
      // Garantir que algo seja salvo, mesmo que o score esteja vazio
      if (user && user.uid) {
        const databasePath = `${this.databaseUserPath}${user.uid}`;
        const databaseRef = ref(this.database, databasePath);

        const dataToSave = {
          displayName: user.displayName || '',
          email: user.email || '',
          uid: user.uid,
        };

        await update(databaseRef, dataToSave).catch((error) => {
          console.error('Erro ao salvar dados do usuário:', error);
        });
      } else {
        console.error('Dados inválidos.');
      }
      return user;
    } catch (error: any) {
      console.error('Erro ao salvar dados do usuário:', error);
      if (error.code === 'PERMISSION_DENIED') {
        throw new Error('Permissão negada para esse usuário.');
      }
      throw error;
    }
  }

  async getUserScore(): Promise<Record<string, number> | null> {
    const user = this.getUser();

    if (user) {
      try {
        let databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;
        const dbRef = ref(this.database);
        const snapshot = await get(child(dbRef, databasePath));

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
