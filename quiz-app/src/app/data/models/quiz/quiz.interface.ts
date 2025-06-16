import { QuizQuestion } from './quiz-question.interface';

export interface Quiz {
  id?: string;
  name: string;
  questions: QuizQuestion[];
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
