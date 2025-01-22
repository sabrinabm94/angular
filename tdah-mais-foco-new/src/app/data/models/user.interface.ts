import { EducationLevel } from './enums/educationLevel.enum';
import { Gender } from './enums/gender.enum';
import { Occupation } from './enums/occupation.enum';
import { FirebaseAuth } from './Firebase-auth.interface';
import { ResultQuizData } from './result-quiz-data.interface';

export interface User extends FirebaseAuth {
  birthdate?: string | Date | null;
  ocupation?: Occupation;
  educationLevel?: EducationLevel;
  gender?: Gender;
  quiz?: ResultQuizData | null;
  active: boolean;
  creationDate?: string | null;
  updateDate?: string | null;
  creatorId?: string | null;
  updaterId?: string | null;
}
