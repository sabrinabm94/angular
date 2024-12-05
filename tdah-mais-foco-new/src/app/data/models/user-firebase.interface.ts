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
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }>;
  refreshToken?: string | null;
  tenantId?: null;
}
