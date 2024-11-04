import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  // Função para buscar perguntas do arquivo JSON
  async getQuestions(language: string): Promise<any[]> {
    language = language ? language : environment.lang;
    let filePath = '/assets/i18n/' + language + '.json';

    try {
      let questions: any = await this.httpClient
        .get<any[]>(filePath)
        .toPromise();
      if (language === 'pt') {
        return questions.pt;
      }
      if (language === 'pt-br') {
        return questions.ptBr;
      }
      return questions || [];
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
      return [];
    }
  }

  getQuizQuestions(language: string) {
    const answers = [];

    return this.getQuestions(language).then(
      (data: any) => {
        if (data && data.quiz && data.quiz.tdah && data.quiz.tdah.questions) {
          const questions = data.quiz.tdah.questions;
          questions.forEach((question) => {
            answers.push({
              question: question.question,
              example: question.example,
              frequency_and_context: question.frequency_and_context,
              area: question.area,
              response: null,
            });
          });
        }
        return answers; // Retorne answers para que a promessa resolva com esse valor
      },
      (error) => {
        console.error('Erro ao carregar perguntas:', error);
        return []; // Retorne uma lista vazia em caso de erro
      }
    );
  }

  calculateResults(answers: any[]) {
    const score = answers.reduce((acc, answer) => {
      if (answer.response) {
        let areas: string[] = [];

        // Verifica se a área é um array
        if (Array.isArray(answer.area)) {
          areas = answer.area; // Se já for um array, usamos diretamente
        } else if (typeof answer.area === 'string') {
          // Se for uma string, dividimos e mapeamos
          areas = answer.area.split(',').map((area) => area.trim());
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

  buildResultsMessage(score: any) {
    if (score) {
    }
  }
}
