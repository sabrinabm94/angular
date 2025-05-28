import { Role } from '../enums/user/user-role.enum';
import { User } from './user.interface';

export interface FirebaseUser extends User {
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: { creationTime?: string; lastSignInTime?: string };
  role?: Role;
  providerData?: Array<{
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
    providerId?: string;
    uid?: string;
  }>;
  refreshToken?: string | null;
  tenantId?: string | null;
}
