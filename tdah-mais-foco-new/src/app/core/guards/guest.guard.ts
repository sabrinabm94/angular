import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      return true; // Usuário não autenticado, permite o acesso
    } else {
      this.router.navigate(['/']); // Redireciona para a página inicial
      return false; // Bloqueia o acesso
    }
  }
}
