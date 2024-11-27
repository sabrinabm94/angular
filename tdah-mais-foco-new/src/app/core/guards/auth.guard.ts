import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    if (user) {
      return true; // Usuário autenticado, permite o acesso
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login
      return false; // Bloqueia o acesso
    }
  }
}
