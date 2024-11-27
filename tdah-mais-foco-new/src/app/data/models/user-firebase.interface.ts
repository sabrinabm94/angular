import { User } from './user.interface';

export interface FirebaseUser extends User {
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
  uid: string;
}
