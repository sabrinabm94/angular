import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/user/Firebase-user.interface';
import { Role } from '../../data/models/enums/user/user-role.enum';
import { QuizResult } from '../../data/models/quiz/quiz-result.interface';
import { TranslateService } from './translate.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: FirebaseUser;
  private userLoaded: boolean = false;
  private databaseQuizPath: string = '/quiz/tdah/score/';
  private databaseUserPath: string = '/users/';
  private userInitialized = false;

  constructor(
    private auth: Auth,
    private database: Database,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {
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

        await update(databaseRef, user)
          .then(() => {
            const errorMessage = this.translateService.translate(
              'user_data_update_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          })
          .catch((error) => {
            const errorMessage = this.translateService.translate(
              'user_data_save_error'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'error',
              true
            );
          });
      } else {
        const errorMessage = this.translateService.translate(
          'user_data_update_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
      return user;
    } catch (error: any) {
      if (error.code === 'PERMISSION_DENIED') {
        const errorMessage =
          this.translateService.translate('permission_denied');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
      const errorMessage = this.translateService.translate(
        'user_data_update_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
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
      const errorMessage = this.translateService.translate('user_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
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
            const errorMessage = this.translateService.translate(
              'current_user_data_error'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'error',
              true
            );
          }
        );
      });
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'current_user_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
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
      const errorMessage = this.translateService.translate(
        'user_data_role_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
      return false;
    }
  }

  public async saveUserScore(score: QuizResult): Promise<QuizResult | null> {
    const user = this.getUser();
    if (!user) return null;

    try {
      const databasePath = `${this.databaseUserPath}${user.uid}${this.databaseQuizPath}`;
      const scoreRef = ref(this.database, databasePath);
      await set(scoreRef, score);
      return score;
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'user_data_score_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async saveUserData(user: FirebaseUser): Promise<FirebaseUser | null> {
    try {
      const databasePath = `${this.databaseUserPath}${user.uid}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, user).then(() => {
        const errorMessage = this.translateService.translate(
          'udar_data_update_success'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'success',
          true
        );
      });
      return user;
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'user_data_save_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async deleteUserData(
    user: FirebaseUser
  ): Promise<FirebaseUser | null> {
    try {
      const databasePath = `${this.databaseUserPath}${user.uid}`;
      const databaseRef = ref(this.database, databasePath);
      user.active = false;
      await update(databaseRef, user).then(() => {
        const errorMessage = this.translateService.translate(
          'user_desactivate_success'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'success',
          true
        );
      });
      return user;
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'user_desactivate_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async getUserScore(userId: string): Promise<QuizResult | null> {
    if (userId) {
      try {
        const databasePath = `${this.databaseUserPath}${userId}${this.databaseQuizPath}`;
        const snapshot = await get(child(ref(this.database), databasePath));
        return snapshot.exists() ? (snapshot.val() as QuizResult) : null;
      } catch (error) {
        const errorMessage =
          this.translateService.translate('persistente_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
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
        const errorMessage =
          this.translateService.translate('users_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    const errorMessage = this.translateService.translate('permission_denied');
    this.alertService.alertMessageTriggerFunction(errorMessage, 'error', true);
    return null;
  }
}
