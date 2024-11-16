interface FirebaseUser extends User {
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
}
