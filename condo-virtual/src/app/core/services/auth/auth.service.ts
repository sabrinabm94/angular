import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'src/init-firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }
}
