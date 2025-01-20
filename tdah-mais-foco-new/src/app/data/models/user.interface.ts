import { EducationLevel } from './enums/educationLevel.enum';
import { Gender } from './enums/gender.enum';
import { Occupation } from './enums/occupation.enum';
import { QuizData } from './quizData.interface';

export interface User {
  birthdate?: string | Date | null;
  ocupation?: Occupation;
  educationLevel?: EducationLevel;
  gender?: Gender;
  quiz?: QuizData | null;
  active: boolean;
}
