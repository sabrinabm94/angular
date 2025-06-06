import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    if (!this.userService.isUserLoaded()) {
      await this.userService.verifyActiveFirebaseAuthUser(); // Aguarda a inicialização
    }
    const user = this.userService.getUser();
    if (!user) {
      return true;
    } else {
      this.router.navigate([`/result/${user.uid}`]); // Redireciona se o usuário já estiver logado
      return false;
    }
  }
}
