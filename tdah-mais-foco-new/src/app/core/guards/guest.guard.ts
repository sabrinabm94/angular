import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): boolean {
    // Obtém o usuário autenticado diretamente do serviço AngularFireAuth
    const user = this.auth.authState;

    // Verifica se o usuário NÃO está autenticado
    if (!user) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/quiz']);
      return false; // Impede o acesso à rota
    }
  }
}
