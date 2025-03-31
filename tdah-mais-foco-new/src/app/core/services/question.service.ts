import { Injectable } from '@angular/core';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/user/Firebase-user.interface';
import { Role } from '../../data/models/enums/user/user-role.enum';
import { QuizQuestion } from '../../data/models/quiz/quiz-question.interface';
import { TranslateService } from './translate.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private databaseQuestionsPath: string = '/quiz/tdah/questions/';

  constructor(
    private database: Database,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  public async update(question: QuizQuestion): Promise<QuizQuestion | null> {
    try {
      if (question && question.id) {
        const databasePath = `${this.databaseQuestionsPath}${question.id}`;
        const databaseRef = ref(this.database, databasePath);

        await update(databaseRef, question)
          .then(() => {
            const errorMessage = this.translateService.translate(
              'question_update_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          })
          .catch((error) => {
            const errorMessage = this.translateService.translate(
              'question_creation_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          });
      } else {
        const errorMessage = this.translateService.translate(
          'question_data_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
      return question;
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
        'question_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async getById(id: string): Promise<QuizQuestion | null> {
    if (!id) {
      console.warn('ID de usuário não fornecido.');
      return null;
    }

    try {
      const databasePath = `${this.databaseQuestionsPath}${id}`;
      const dbRef = ref(this.database);
      const snapshot = await get(child(dbRef, databasePath));

      if (!snapshot.exists()) {
        console.warn('Pergunta não encontrada.');
        return null;
      }
      return snapshot.val();
    } catch (error: any) {
      const errorMessage = this.translateService.translate(
        'question_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async save(question: QuizQuestion): Promise<QuizQuestion | null> {
    try {
      const databasePath = `${this.databaseQuestionsPath}${question.id}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, question).then(() => {
        const errorMessage = this.translateService.translate(
          'question_update_success'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'success',
          true
        );
      });
      return question;
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'question_creation_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async delete(question: QuizQuestion): Promise<QuizQuestion | null> {
    try {
      const databasePath = `${this.databaseQuestionsPath}${question.id}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, question).then(() => {
        const errorMessage = this.translateService.translate(
          'question_desactivate_success'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'success',
          true
        );
      });
      return question;
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'question_desactivate_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }

    return null;
  }

  public async getAll(userAdmin: FirebaseUser): Promise<QuizQuestion[] | null> {
    if (userAdmin && userAdmin.role === Role.administrator) {
      try {
        const snapshot = await get(
          ref(this.database, this.databaseQuestionsPath)
        );
        if (!snapshot.exists()) return null;
        const questionsData = snapshot.val();
        //Pelo id encontra seus dados no banco e retorna para cada usuário um registro na lista
        return Object.keys(questionsData).map((key) => ({
          uid: key,
          ...questionsData[key],
        }));
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'question_data_error'
        );
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
