import { QuestionArea } from '../enums/question/question-area.enum';
import { QuizQuestionQuestion } from './quiz-question-question.interface';

export interface QuizQuestion {
  id?: string;
  questions: QuizQuestionQuestion[];
  area: QuestionArea[];
  result?: boolean;
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
