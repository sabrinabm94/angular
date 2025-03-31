import { QuestionArea } from '../enums/question/question-area.enum';

export interface QuizQuestion {
  id?: string;
  question: string;
  example: string;
  frequency: string;
  context: string;
  area: QuestionArea[];
  result?: boolean;
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
