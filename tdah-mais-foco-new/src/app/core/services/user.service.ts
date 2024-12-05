import { Injectable } from '@angular/core';
import { FirebaseUser } from '../../data/models/user-firebase.interface';
import { Database, ref, set, get, child } from '@angular/fire/database';
import {
  Auth,
  onAuthStateChanged,
  User as FirebaseAuthUser,
  IdTokenResult,
} from '@angular/fire/auth';
import { BehaviorSubject, first } from 'rxjs';

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
        this.user = this.adaptToFirebaseUser(user); // Adapta para o tipo correto
        this.userSubject.next(this.user);
      }
    });
  }

  // Função para adaptar o tipo FirebaseUser para o tipo User do Firebase
  adaptToFirebaseUser(firebaseUser: FirebaseAuthUser): FirebaseUser {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || null,
      displayName: firebaseUser.displayName || null,
    };
  }

  async getIdTokenResultForUser(
    user: FirebaseAuthUser
  ): Promise<IdTokenResult> {
    try {
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult;
    } catch (error) {
      console.error('Erro ao obter o IdTokenResult:', error);
      throw error;
    }
  }

  setUser(user: FirebaseUser | null): FirebaseUser | null {
    console.log('user service set user ', user);

    if (user) {
      this.userSubject.next(user);
      return (this.user = user);
    }

    return null;
  }

  // Retorna o usuário atual
  getUser(): FirebaseUser | null {
    const user = this.auth.currentUser;

    if (user) {
      console.log('user service get user ', user);
      return (this.user = this.adaptToFirebaseUser(user));
    }

    return null;
  }

  // Salva a pontuação do usuário no Realtime Database
  async saveUserScore(
    score: Record<string, number>
  ): Promise<Record<string, number> | null> {
    const user = this.getUser();

    if (user) {
      const userId = user.uid;

      //salva score pelo id do usuário ativo
      if (userId) {
        console.log('userId ', userId);

        try {
          const scoreRef = ref(
            this.db,
            `users/${userId}${this.tdahQuizScorePath}`
          );
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
    }

    return null;
  }

  // Busca a pontuação do usuário no Realtime Database
  async getUserScore(): Promise<Record<string, number> | null> {
    const user = this.getUser();

    if (user) {
      const userId = user.uid;

      //salva score pelo id do usuário ativo
      if (userId) {
        console.log('userId ', userId);

        try {
          const dbRef = ref(this.db);
          const snapshot = await get(
            child(dbRef, `users/${userId}${this.tdahQuizScorePath}`)
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
      } else {
        throw new Error('Acesso negado: o id do usuário não corresponde.');
      }
    }

    return null;
  }

  async getAuthenticatedUserId(): Promise<string | null> {
    const currentUser = this.auth.currentUser;
    return currentUser ? currentUser.uid : null;
  }
}
