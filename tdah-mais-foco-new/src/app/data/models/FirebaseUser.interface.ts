import { User } from './user.interface';

export interface FirebaseUser extends User {
  email: string | null;
  password?: string | null;
  displayName?: string | null;
  uid: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: { creationTime?: string; lastSignInTime?: string };
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
