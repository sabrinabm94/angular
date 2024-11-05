import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async loginWithEmail() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  async register() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  async recoverPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      alert('Email de recuperação enviado!');
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }
}
