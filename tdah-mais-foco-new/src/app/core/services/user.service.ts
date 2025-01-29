import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/Firebase-user.interface';
import { ResultQuizData } from '../../data/models/result-quiz-data.interface';
import { Role } from '../../data/models/enums/role.enum';
import { FirebaseAuth } from '../../data/models/Firebase-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: FirebaseUser;
  private userLoaded: boolean = false;
  private databaseQuizPath: string = '/quiz/tdah/score/';
  private databaseUserPath: string = '/users/';
  private userInitialized = false;

  constructor(private auth: Auth, private database: Database) {
    this.verifyActiveFirebaseAuthUser();
  }

  public setUser(user: FirebaseUser | null): FirebaseUser | null {
    if (user) {
      return (this.user = user);
    }
    return null;
  }

  public convertFirebaseAuthToUser(user: any): FirebaseUser | null {
    if (user) {
      let firebaseUser: FirebaseUser = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
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
        throw new Error('Erro de permissão inválida: ' + error);
      }
      throw new Error('Erro ao atualizar dados de usuário: ' + error);
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

  public async verifyActiveFirebaseAuthUser(): Promise<void> {
    if (this.userInitialized) return;
    this.userInitialized = true;

    try {
      return new Promise<void>((resolve, reject) => {
        onAuthStateChanged(
          this.auth,
          (user) => {
            if (user) {
              this.setUser(this.convertFirebaseAuthToUser(user));
            } else {
              this.setUser(null);
            }
            this.userLoaded = true;
            resolve();
          },
          (error) => {
            const errorMessage = 'Erro ao carregar usuário';
            console.error(errorMessage, error);
            throw new Error(errorMessage + error);
          }
        );
      });
    } catch (error) {
      const errorMessage = 'Erro ao inicializar o usuário';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
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
      const errorMessage = 'Erro ao verificar papel do usuário';
      console.error(errorMessage, error);
      return false;
    }
  }

  public async saveUserScore(
    score: ResultQuizData
  ): Promise<ResultQuizData | null> {
    const user = this.getUser();
    if (!user) return null;

    try {
      const databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;
      const scoreRef = ref(this.database, databasePath);
      await set(scoreRef, score);
      return score;
    } catch (error) {
      const errorMessage = 'Erro ao salvar pontuação';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
    }
  }

  public async saveUserData(user: FirebaseUser): Promise<FirebaseUser | null> {
    try {
      const databasePath = `${this.databaseUserPath}${user.uid}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, user);
      return user;
    } catch (error) {
      const errorMessage = 'Erro ao salvar dados de usuário ';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
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
      const errorMessage = 'Erro ao desativar usuário';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
    }
  }

  public async getUserScore(userId: string): Promise<ResultQuizData | null> {
    if (userId) {
      try {
        const databasePath = `${this.databaseUserPath}${userId}${this.databaseQuizPath}`;
        const snapshot = await get(child(ref(this.database), databasePath));
        return snapshot.exists() ? (snapshot.val() as ResultQuizData) : null;
      } catch (error) {
        const errorMessage = 'Erro ao obter pontuação de usuário';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    }
    return null;
  }

  public async getAllUsersData(
    userAdmin: FirebaseUser
  ): Promise<FirebaseUser[] | null> {
    if (userAdmin && userAdmin.role === Role.administrator) {
      try {
        const snapshot = await get(ref(this.database, this.databaseUserPath));
        if (!snapshot.exists()) return null;
        const usersData = snapshot.val();
        //Pelo id do usuário, encontra seus dados no banco e retorna para cada usuário um registro na lista
        return Object.keys(usersData).map((key) => ({
          uid: key,
          ...usersData[key],
        }));
      } catch (error) {
        const errorMessage = 'Erro ao obter usuários';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    }
    console.error('Permissão negada');
    return null;
  }
}
