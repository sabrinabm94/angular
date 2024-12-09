import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    if (!this.userService.isUserLoaded()) {
      await this.userService.initializeUser();
    }

    const user = this.userService.getUser();
    if (user) {
      console.log('Usuário autenticado:', user);
      return true;
    } else {
      console.log('Usuário não autenticado, redirecionando para login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
