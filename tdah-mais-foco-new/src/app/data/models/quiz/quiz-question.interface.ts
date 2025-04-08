import { QuestionArea } from '../enums/question/question-area.enum';
import { Language } from '../language.interface';

export interface QuizQuestion {
  id?: string;
  questions: {
    question: string;
    example: string;
    frequency: string;
    context: string;
    language: Language;
  }[];
  area: QuestionArea[];
  result?: boolean;
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
