import { EducationLevel } from '../enums/user/user-educationLevel.enum';
import { Gender } from '../enums/user/user-gender.enum';
import { Occupation } from '../enums/user/user-occupation.enum';
import { QuizResult } from '../quiz/quiz-result.interface';
import { FirebaseAuth } from './Firebase-auth.interface';

export interface User extends FirebaseAuth {
  birthdate?: string | Date | null;
  ocupation?: Occupation;
  educationLevel?: EducationLevel;
  gender?: Gender;
  quiz?: QuizResult | null;
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
