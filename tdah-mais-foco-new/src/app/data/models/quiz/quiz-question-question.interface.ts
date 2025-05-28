import { Language } from '../language.interface';

export interface QuizQuestionQuestion {
  question: string;
  example: string;
  frequency: string;
  context: string;
  language: Language;
}
