import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuizResultByArea } from '../../data/models/quiz/quiz-result-by-area.interface';
import { DateUtils } from '../utils/date.utils';
import { QuizResult } from '../../data/models/quiz/quiz-result.interface';
import { TranslateService } from './translate.service';
import { AlertService } from './alert.service';
import { Quiz } from '../../data/models/quiz/quiz.interface';
import { FirebaseUser } from '../../data/models/user/Firebase-user.interface';
import { Role } from '../../data/models/enums/user/user-role.enum';
import { Database, ref, child, get, set, update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(
    private database: Database,
    private httpClient: HttpClient,
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  private databaseQuizPath: string = '/quiz/';

  public async readFileContentByLanguage(
    language: string | null
  ): Promise<any[]> {
    language = language ? language : environment.lang;
    let filePath = 'assets/i18n/' + language + '.json';

    try {
      let content: any = await this.httpClient.get<any[]>(filePath).toPromise();
      return content || [];
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'language_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return [];
  }

  public getQuizs(language: string | null) {
    const answers: any[] | PromiseLike<any[]> = [];

    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.quizs) {
          const quizs = data.quiz.tdah.quizs;
          quizs.forEach(
            (quiz: {
              quiz: any;
              example: any;
              frequency_and_context: any;
              area: any;
            }) => {
              answers.push({
                quiz: quiz.quiz,
                example: quiz.example,
                frequency_and_context: quiz.frequency_and_context,
                area: quiz.area,
                result: null,
              });
            }
          );
        }
        return answers;
      },
      (error) => {
        const errorMessage = this.translateService.translate(
          'language_data_processing_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
        return [];
      }
    );
  }

  public getQuizAreaMessages(language: string | null): Promise<any[]> {
    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.results) {
          return data.quiz.tdah.results;
        }
      },
      (error) => {
        const errorMessage = this.translateService.translate(
          'quiz_data_processing_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
        return [];
      }
    );
  }

  public getQuizResumeMessages(language: string | null) {
    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.messages) {
          return data.quiz.tdah.messages;
        }
      },
      (error) => {
        const errorMessage = this.translateService.translate(
          'quiz_results_processing_error'
        );
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
        return [];
      }
    );
  }

  public getQuizDate(score: QuizResult): string | null {
    if (score && score.creationDate) {
      return score.creationDate;
    }
    return null;
  }

  public calculateResultsByArea(
    score: QuizResult,
    messagesByArea: any[]
  ): QuizResultByArea[] | [] {
    const resultsByAreas: QuizResultByArea[] = [];

    if (score) {
      let scoreData = score.score;
      for (const areaName in scoreData) {
        let areaScore: number = scoreData[areaName];
        let areaLevel: any = '';

        // Determine the level based on areaScore
        if (areaScore >= 4 && areaScore <= 6) {
          areaLevel = 'moderate';
        } else if (areaScore >= 7 && areaScore <= 9) {
          areaLevel = 'medium';
        } else if (areaScore >= 10) {
          areaLevel = 'high';
        } else if (areaScore <= 3) {
          areaLevel = 'low';
        }

        // Find the message for the current area (if any)
        const areaResultsMessage: string =
          messagesByArea.find((messages) => messages.area === areaName)
            ?.messages || '';

        resultsByAreas.push({
          name: areaName,
          score: areaScore,
          level: areaLevel,
          message: areaResultsMessage[areaLevel],
        });
      }
    }

    return resultsByAreas;
  }

  public calculateResults(
    score: QuizResult,
    messages: any
  ): QuizResultByArea | null {
    let totalAreas = 0;
    let totalAreasScore = 0;
    let finalScore = 0;
    let finalLevel = 'low';
    let quizResult: QuizResultByArea = {
      score: 0,
      level: finalLevel,
      message: String(messages[finalLevel]),
    };

    if (score) {
      let scoreData = score.score;
      for (const areaName in scoreData) {
        totalAreasScore = +scoreData[areaName];
        totalAreas = +1;
      }

      finalScore = totalAreasScore;

      if (finalScore) {
        // Determine the level based on areaScore
        if (finalScore >= 4 && finalScore <= 6) {
          finalLevel = 'moderate';
        } else if (finalScore >= 7 && finalScore <= 9) {
          finalLevel = 'medium';
        } else if (finalScore >= 10) {
          finalLevel = 'high';
        } else if (finalScore <= 3) {
          finalLevel = 'low';
        }

        quizResult = {
          score: Number(finalScore),
          level: String(finalLevel),
          message: String(messages[finalLevel]),
        };
      }
    }

    return quizResult;
  }

  public async getResultsMessageByArea(language: string | null) {
    return await this.getQuizAreaMessages(language);
  }

  public async getResultsMessage(language: string | null) {
    return await this.getQuizResumeMessages(language);
  }

  public async calculateResultsScoreByArea(
    answers: any[],
    isFirstScore: boolean
  ): Promise<QuizResult> {
    let score = { default: 0 };

    if (answers && answers.length > 0) {
      score = answers.reduce((acc, answer) => {
        //seleciona somente as respostas que foram respondidas
        if (answer.result != null && answer.result === true) {
          let selectedAreas: string[] = [];

          if (Array.isArray(answer.area)) {
            selectedAreas = answer.area;
          } else if (typeof answer.area === 'string') {
            selectedAreas = answer.area
              .split(',')
              .map((area: string) => area.trim());
          } else {
            console.warn(`Pergunta sem área válida:`, answer);
            return acc;
          }

          selectedAreas.forEach((selectedArea) => {
            acc[selectedArea] = (acc[selectedArea] || 0) + 1;
          });
        }
        return acc;
      }, {} as QuizResult);
    }

    const today = this.dateUtils.formateDateToInternationFormatString(
      new Date()
    );

    const calculatedScore: QuizResult = {
      updateDate: today,
      score: score,
    };

    if (isFirstScore && isFirstScore === true) {
      calculatedScore.creationDate = today;
    }

    return calculatedScore;
  }

  //novo
  public async getAll(userAdmin: FirebaseUser): Promise<Quiz[] | null> {
    if (userAdmin && userAdmin.role === Role.administrator) {
      try {
        const databasePath = `${this.databaseQuizPath}`;
        const dbRef = ref(this.database);
        const snapshot = await get(child(dbRef, databasePath));
        const data = snapshot.val();
        return data;
      } catch (error: any) {
        const errorMessage = this.translateService.translate('quiz_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    return null;
  }

  public async getById(
    id: string,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    if (id && userAdmin && userAdmin.role === Role.administrator) {
      try {
        const databasePath = `${this.databaseQuizPath}${id}`;
        const dbRef = ref(this.database);
        const snapshot = await get(child(dbRef, databasePath));
        const data = snapshot.val();
        return data;
      } catch (error: any) {
        const errorMessage = this.translateService.translate('quiz_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    return null;
  }

  public async save(quiz: Quiz, userAdmin: FirebaseUser): Promise<Quiz | null> {
    if (quiz && userAdmin && userAdmin.role === Role.administrator) {
      const quizId = quiz.id;
      try {
        const databasePath = `${this.databaseQuizPath}${quizId}`;
        const databaseRef = ref(this.database, databasePath);
        await update(databaseRef, quiz).then(() => {
          const errorMessage = this.translateService.translate(
            'quiz_update_success'
          );
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'success',
            true
          );
        });
        return quiz;
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'quiz_creation_error'
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
    quiz: Quiz,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    try {
      if (quiz && userAdmin) {
        const quizId = quiz.id;

        const databasePath = `${this.databaseQuizPath}${quizId}`;
        const databaseRef = ref(this.database, databasePath);

        await update(databaseRef, quiz)
          .then(() => {
            const errorMessage = this.translateService.translate(
              'quiz_update_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          })
          .catch((error) => {
            const errorMessage = this.translateService.translate(
              'quiz_creation_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          });
      } else {
        const errorMessage = this.translateService.translate('quiz_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
      return quiz;
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
      const errorMessage = this.translateService.translate('quiz_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async delete(
    quiz: Quiz,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    if (quiz && userAdmin) {
      const quizId = quiz.id;

      try {
        const databasePath = `${this.databaseQuizPath}${quizId}`;
        const databaseRef = ref(this.database, databasePath);
        await update(databaseRef, quiz).then(() => {
          const errorMessage = this.translateService.translate(
            'quiz_desactivate_success'
          );
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'success',
            true
          );
        });
        return quiz;
      } catch (error) {
        const errorMessage = this.translateService.translate(
          'quiz_desactivate_error'
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
