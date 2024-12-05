import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const user = this.userService.getUser();
    if (user) {
      // usuário autenticado
      console.log('auth user ', user);
      return true; // Permite acesso
    } else {
      this.router.navigate(['/']);
      return false; // Bloqueia o acesso
    }
  }
}
