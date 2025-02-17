import { Injectable } from '@angular/core';
import { Database, ref, child, get, set, update } from '@angular/fire/database';
import { FirebaseUser } from '../../data/models/user/Firebase-user.interface';
import { Role } from '../../data/models/enums/user/user-role.enum';
import { QuizQuestion } from '../../data/models/quiz/quiz-question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private databaseQuestionsPath: string = '/quiz/tdah/questions/';

  constructor(private database: Database) {}

  public async updateQuestionData(
    question: QuizQuestion
  ): Promise<QuizQuestion | null> {
    try {
      if (question && question.id) {
        const databasePath = `${this.databaseQuestionsPath}${question.id}`;
        const databaseRef = ref(this.database, databasePath);

        await update(databaseRef, question).catch((error) => {
          console.error('Erro ao salvar dados de pergunta:', error);
        });
      } else {
        console.error('Dados inválidos.');
      }
      return question;
    } catch (error: any) {
      console.error('Erro ao salvar dados do pergunta:', error);
      if (error.code === 'PERMISSION_DENIED') {
        throw new Error('Erro de permissão inválida: ' + error);
      }
      throw new Error('Erro ao atualizar dados de pergunta: ' + error);
    }
  }

  public async getQuestionDataById(id: string): Promise<QuizQuestion | null> {
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
      console.error('Erro ao buscar pergunta:', error);
      throw new Error(error.message || 'Erro inesperado.');
    }
  }

  public async saveQuestionData(
    question: QuizQuestion
  ): Promise<QuizQuestion | null> {
    try {
      const databasePath = `${this.databaseQuestionsPath}${question.id}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, question);
      return question;
    } catch (error) {
      const errorMessage = 'Erro ao salvar dados de pergunta ';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
    }
  }

  public async deleteQuestionData(
    question: QuizQuestion
  ): Promise<QuizQuestion | null> {
    try {
      const databasePath = `${this.databaseQuestionsPath}${question.id}`;
      const databaseRef = ref(this.database, databasePath);
      await update(databaseRef, question);
      return question;
    } catch (error) {
      const errorMessage = 'Erro ao desativar usuário';
      console.error(errorMessage, error);
      throw new Error(errorMessage + error);
    }
  }

  public async getAllQuestionsData(
    userAdmin: FirebaseUser
  ): Promise<QuizQuestion[] | null> {
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
        const errorMessage = 'Erro ao obter perguntas';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    }
    console.error('Permissão negada');
    return null;
  }
}
