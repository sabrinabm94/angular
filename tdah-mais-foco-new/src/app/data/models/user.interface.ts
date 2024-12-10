import { QuizData } from './quizData.interface';

export interface User {
  birthdate?: string | null;
  ocupation?: string | null;
  educationLevel?: string | null;
  quiz?: QuizData;
}
