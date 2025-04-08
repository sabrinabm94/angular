import { Injectable } from '@angular/core';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/user/Firebase-user.interface';
import { Role } from '../../data/models/enums/user/user-role.enum';
import { QuizQuestion } from '../../data/models/quiz/quiz-question.interface';
import { TranslateService } from './translate.service';
import { AlertService } from './alert.service';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private database: Database,
    private translateService: TranslateService,
    private alertService: AlertService,
    private quizService: QuizService
  ) {}

  public async getAllByQuizId(
    quizId: string,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion[] | null> {
    const databasePath = `quiz/${quizId}/questions`;

    if (quizId && userAdmin && userAdmin.role === Role.administrator) {
      try {
        const quiz = await this.quizService.getById(quizId, userAdmin);

        if (quiz && quiz.questions && quiz.questions.length > 0) {
          const successMessage =
            this.translateService.translate('quiz_list_success');
          this.alertService.alertMessageTriggerFunction(
            successMessage,
            'success',
            true
          );

          return quiz.questions;
        }

        return [];
      } catch (error) {
        const errorMessage = this.translateService.translate('quiz_list_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }

    return null;
  }

  public async getOneById(
    quizId: string,
    questionId: string,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion | null> {
    if (quizId && questionId && userAdmin) {
      const quizQuestions = await this.getAllByQuizId(quizId, userAdmin);

      if (quizQuestions) {
        const question =
          quizQuestions.find((question) => question.id === questionId) || null;
        return question;
      }
    }
    return null;
  }

  public async save(
    quizId: string,
    question: QuizQuestion,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion | null> {
    if (quizId && userAdmin && userAdmin.role === Role.administrator) {
      try {
        const databasePath = `quiz/${quizId}/questions`;
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
    }
    return null;
  }

  public async update(
    quizId: string,
    question: QuizQuestion,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion | null> {
    if (quizId && userAdmin && userAdmin.role === Role.administrator) {
      try {
        if (question && question.id) {
          const databasePath = `quiz/${quizId}/questions`;
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
    }
    return null;
  }

  public async delete(
    quizId: string,
    question: QuizQuestion,
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion | null> {
    if (quizId && userAdmin && userAdmin.role === Role.administrator) {
      try {
        const databasePath = `quiz/${quizId}/questions`;
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
    }
    return null;
  }
}
