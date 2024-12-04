import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuizResult } from '../../data/models/quizResult.interface';
import { QuizResultByArea } from '../../data/models/quizResultByArea.interface';

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

  getQuizAreaMessages(language: string): Promise<any[]> {
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

  getQuizResumeMessages(language: string) {
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

  calculateResultsByArea(
    score: any,
    messagesByArea: any[]
  ): QuizResultByArea[] {
    const resultsByAreas: QuizResultByArea[] = [];

    if (score) {
      for (const areaName in score) {
        let areaScore: number = score[areaName];
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

  calculateResults(score: any, messages: any): QuizResult | null {
    let totalAreas = 0;
    let totalAreasScore = 0;
    let finalScore = 0;
    let finalLevel = 'low';
    let quizResult: QuizResult = {
      score: 0,
      level: finalLevel,
      message: String(messages[finalLevel]),
    };

    if (score) {
      for (const areaName in score) {
        totalAreasScore = +score[areaName];
        totalAreas = +1;
      }

      finalScore = totalAreasScore / totalAreas;

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

  async getResultsMessageByArea(language: string) {
    return await this.getQuizAreaMessages(language);
  }

  async getResultsMessage(language: string) {
    return await this.getQuizResumeMessages(language);
  }

  async calculateResultsScoreByArea(
    answers: any[]
  ): Promise<Record<string, number>> {
    let score = null;

    if (answers && answers.length > 0) {
      score = answers.reduce((acc, answer) => {
        //seleciona somente as respostas que foram selecionadas

        if (answer.response != null && answer.response === true) {
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
        } else {
          console.warn('Resposta ausente para a pergunta:', answer);
        }
        return acc;
      }, {} as Record<string, number>);
    }

    return score;
  }
}
