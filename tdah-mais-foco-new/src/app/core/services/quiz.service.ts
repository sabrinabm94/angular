import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  async readFileContentByLanguage(language: string): Promise<any[]> {
    language = language ? language : environment.lang;
    let filePath = 'assets/i18n/' + language + '.json';

    try {
      let content: any = await this.httpClient.get<any[]>(filePath).toPromise();
      return content || [];
    } catch (error) {
      console.error('Erro ao ler arquivo:', error);
      return [];
    }
  }

  getQuizQuestions(language: string) {
    const answers: any[] | PromiseLike<any[]> = [];

    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.questions) {
          const questions = data.quiz.tdah.questions;
          questions.forEach(
            (question: {
              question: any;
              example: any;
              frequency_and_context: any;
              area: any;
            }) => {
              answers.push({
                question: question.question,
                example: question.example,
                frequency_and_context: question.frequency_and_context,
                area: question.area,
                response: null,
              });
            }
          );
        }
        return answers;
      },
      (error) => {
        console.error('Erro ao processar as perguntas do quiz:', error);
        return [];
      }
    );
  }

  getQuizResultsByArea(language: string) {
    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.results) {
          return data.quiz.tdah.results;
        }
      },
      (error) => {
        console.error('Erro ao processar os resultados do quiz:', error);
        return [];
      }
    );
  }

  getQuizResults(language: string) {
    return this.readFileContentByLanguage(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.messages) {
          return data.quiz.tdah.messages;
        }
      },
      (error) => {
        console.error('Erro ao processar os resultados do quiz:', error);
        return [];
      }
    );
  }

  calculateResultsByArea(score: any, messagesByArea: any[]): any[] {
    const resultsByAreas = [];

    if (score) {
      for (const areaName in score) {
        let areaScore = score[areaName];
        let areaLevel = '';

        // Determine the level based on areaScore
        if (areaScore >= 1 && areaScore <= 3) {
          areaLevel = 'low';
        } else if (areaScore >= 4 && areaScore <= 6) {
          areaLevel = 'moderate';
        } else if (areaScore >= 7 && areaScore <= 9) {
          areaLevel = 'medium';
        } else if (areaScore >= 10) {
          areaLevel = 'high';
        }

        // Find the message for the current area (if any)
        const areaResultsMessage =
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

  calculateResults(score: any, messages: any): any {
    if (score) {
      let totalAreas = 0;
      let totalAreasScore = 0;
      let finalScore = 0;
      let finalLevel = '';

      for (const areaName in score) {
        totalAreasScore = +score[areaName];
        totalAreas = +1;
      }

      finalScore = totalAreasScore / totalAreas;

      // Determine the level based on areaScore
      if (finalScore >= 1 && finalScore <= 3) {
        finalLevel = 'low';
      } else if (finalScore >= 4 && finalScore <= 6) {
        finalLevel = 'moderate';
      } else if (finalScore >= 7 && finalScore <= 9) {
        finalLevel = 'medium';
      } else if (finalScore >= 10) {
        finalLevel = 'high';
      }

      const result = {
        score: Number(finalScore),
        level: Number(finalLevel),
        message: String(messages[finalLevel]),
      };

      return result;
    }
    return null;
  }

  async getResultsMessageByArea(language: string) {
    return await this.getQuizResultsByArea(language);
  }

  async getResultsMessage(language: string) {
    return await this.getQuizResults(language);
  }

  async calculateQuestionsScore(
    answers: any[]
  ): Promise<Record<string, number>> {
    const score = answers.reduce((acc, answer) => {
      if (answer.response) {
        let areas: string[] = [];

        // Verifica se a área é um array
        if (Array.isArray(answer.area)) {
          areas = answer.area; // Se já for um array, usamos diretamente
        } else if (typeof answer.area === 'string') {
          // Se for uma string, dividimos e mapeamos
          areas = answer.area.split(',').map((area: string) => area.trim());
        } else {
          return acc;
        }

        // Contar o escore individualmente para cada área
        areas.forEach((area) => {
          acc[area] = (acc[area] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    return score;
  }
}
