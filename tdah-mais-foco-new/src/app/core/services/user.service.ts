import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/FirebaseUser.interface';
import { QuizData } from '../../data/models/quizData.interface';
import { Role } from '../../data/models/enums/role.enum';
import { FirebaseAuth } from '../../data/models/FirebaseAuth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: FirebaseUser | null = null;
  private userLoaded: boolean = false;
  private databaseQuizPath: string = '/quiz/tdah/score/';
  private databaseUserPath: string = '/users/';
  private userInitialized = false;

  constructor(private auth: Auth, private database: Database) {
    this.initializeUser();
  }

  public setUser(user: FirebaseUser | null): FirebaseUser | null {
    this.user = user;
    return this.user;
  }

  public convertFirebaseAuthToUser(
    user: FirebaseAuth | null
  ): FirebaseUser | null {
    if (user) {
      let firebaseUser: FirebaseUser = {
        email: user.email ? user.email : null,
        password: user.password ? user.password : null,
        displayName: user.displayName ? user.displayName : null,
        uid: user.uid ? user.uid : null,
        active: true,
      };

      return firebaseUser;
    }
    return null;
  }

  public async updateUserData(
    user: FirebaseUser
  ): Promise<FirebaseUser | null> {
    try {
      if (user && user.uid) {
        const databasePath = `${this.databaseUserPath}${user.uid}`;
        const databaseRef = ref(this.database, databasePath);

        await update(databaseRef, user).catch((error) => {
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

  public async getUserDataById(id: string): Promise<FirebaseUser | null> {
    if (!id) {
      console.warn('ID de usuário não fornecido.');
      return null;
    }

    try {
      const databasePath = `${this.databaseUserPath}${id}`;
      const dbRef = ref(this.database);
      const snapshot = await get(child(dbRef, databasePath));

      if (!snapshot.exists()) {
        console.warn('Usuário não encontrado.');
        return null;
      }
      return snapshot.val();
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error(error.message || 'Erro inesperado.');
    }
  }

  public async initializeUser(): Promise<void> {
    if (this.userInitialized) return;
    this.userInitialized = true;

    try {
      return new Promise<void>((resolve, reject) => {
        onAuthStateChanged(
          this.auth,
          (user) => {
            //this.user = user;
            this.userLoaded = true;
            resolve();
          },
          (error) => {
            console.error('Erro ao carregar usuário:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Erro ao inicializar usuário:', error);
    }
  }

  public isUserLoaded(): boolean {
    return this.userLoaded;
  }

  public getUser(): FirebaseUser | null {
    return this.user;
  }

  public async isUserAdminById(id: string): Promise<boolean> {
    if (!id) return false;

    try {
      const userRef = ref(this.database, `/users/${id}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        return userData.role === Role.administrator;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar admin:', error);
      return false;
    }
  }

  public async saveUserScore(score: QuizData): Promise<QuizData | null> {
    const user = this.getUser();
    if (!user) return null;

    try {
      const databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;
      const scoreRef = ref(this.database, databasePath);
      await set(scoreRef, score);
      return score;
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error);
      throw error;
    }
  }

  public async saveUserData(user: FirebaseUser): Promise<FirebaseUser | null> {
    try {
      const databasePath = `${this.databaseUserPath}${user.uid}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, user);
      return user;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  }

  public async deleteUserData(
    user: FirebaseUser
  ): Promise<FirebaseUser | null> {
    try {
      const databasePath = `${this.databaseUserPath}${user.uid}`;
      const databaseRef = ref(this.database, databasePath);
      user.active = false;
      await update(databaseRef, user);
      return user;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  }

  public async getUserScore(): Promise<QuizData | null> {
    const user = this.getUser();
    if (!user) return null;

    try {
      const databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;
      const snapshot = await get(child(ref(this.database), databasePath));
      return snapshot.exists() ? (snapshot.val() as QuizData) : null;
    } catch (error) {
      console.error('Erro ao buscar pontuação:', error);
      throw error;
    }
  }

  public async getAllUsersData(
    currentUser: FirebaseUser
  ): Promise<FirebaseUser[] | null> {
    if (currentUser && currentUser.role === Role.administrator) {
      try {
        const snapshot = await get(ref(this.database, this.databaseUserPath));
        if (!snapshot.exists()) return null;
        const usersData = snapshot.val();
        return Object.keys(usersData).map((key) => ({
          uid: key,
          ...usersData[key],
        }));
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
      }
    }
    console.error('Permissão negada.');
    return null;
  }
}
