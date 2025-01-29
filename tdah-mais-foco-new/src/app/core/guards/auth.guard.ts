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
      await this.userService.verifyActiveFirebaseAuthUser(); // Aguarda a inicialização
    }

    const user = this.userService.getUser();
    console.log('AuthGuard - canActivate', user);

    if (user) {
      return true;
    } else {
      this.router.navigate([`/login`]); // Redireciona se o usuário não estiver logado
      return false;
    }
  }
}
