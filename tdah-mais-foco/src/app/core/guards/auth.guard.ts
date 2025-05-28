import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está autenticado de forma síncrona
    const user = this.auth.currentUser;

    if (user) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']);
      return false; // Impede o acesso à rota
    }
  }
}
